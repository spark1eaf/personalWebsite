package com.scottphebert.personalwebsite.service.wordle;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.dto.WordleMatchResult;
import com.scottphebert.personalwebsite.model.dto.WordleResponse;
import com.scottphebert.personalwebsite.model.entity.User;
import com.scottphebert.personalwebsite.model.entity.UserDetails;
import com.scottphebert.personalwebsite.repo.ScheduledDataRepo;
import com.scottphebert.personalwebsite.repo.UserDetailsRepo;
import com.scottphebert.personalwebsite.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class WordleServiceImpl implements WordleService {

    private static final Logger logger = LoggerFactory.getLogger(WordleServiceImpl.class);

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Autowired
    ScheduledDataRepo scheduledDataRepo;

    //retrieves today's word
    public ResponseEntity<String> retrieveDailyWord() {
        try{
            String todaysWord = scheduledDataRepo.findWordleWord()
                .orElseThrow(() -> new EntityNotFoundException(Constants.DAILY_WORD_NOT_FOUND));
            return new ResponseEntity<>(todaysWord, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            logger.error(ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //processes attempt at solving wordle
    public ResponseEntity<Object> processWordleAttempt(String username, String word, int attemptNum){

        try {
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException(Constants.USER_NOT_FOUND_USERNAME + username));
            UserDetails userDetails = userDetailsRepo.findById(user.getId())
                    .orElseThrow(() -> new EntityNotFoundException(Constants.USER_DETAILS_NOT_FOUND + user.getId()));
            if(!userDetails.isWordleAttemptLimitReached()){
                if(attemptNum == 5) {
                    userDetails.setWordleAttemptLimitReached(true);
                    userDetailsRepo.save(userDetails);
                }
                return evaluateAttempt(word.toUpperCase(), userDetails);
            }
            else
                return new ResponseEntity<>(Constants.ATTEMPT_LIMIT_REACHED , HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            logger.error(ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //evaluates provided attempt and returns a response entity containing the results
    private ResponseEntity<Object> evaluateAttempt(String word, UserDetails userDetails){

        String dailyWord = scheduledDataRepo.findWordleWord()
                .orElseThrow(() -> new EntityNotFoundException(Constants.DAILY_WORD_NOT_FOUND));
        WordleResponse response = new WordleResponse();
        //word is invalid length
        if(word.length() != 5)
            return new ResponseEntity<>(Constants.INVALID_WORDLE_LENGTH, HttpStatus.BAD_REQUEST);
        //word is exact match
        else if(dailyWord.equalsIgnoreCase(word)){
            try {
                updateWordleDetails(userDetails);
            }
            catch (Exception ex){
                logger.error(Constants.USER_DETAILS_UPDATE_ERROR_LOG, userDetails.getId(), ex.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            response.setAttemptResults(generateExactMatchResults(word));
        }
        else
            response.setAttemptResults(generateResults(word, dailyWord));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //creates a result array by comparing the provided word with the daily word
    private ArrayList<WordleMatchResult> generateResults(String word, String dailyWord) {
        Map<Character, Integer> dailywordMap = populateWordMap(dailyWord);
        ArrayList<WordleMatchResult> results = new ArrayList<>();

        //check for full matches and initialize results
        for(int i = 0; i < word.length(); i++){
            char letter = word.charAt(i);
            WordleMatchResult result = new WordleMatchResult();
            result.setLetter(letter);
            if(letter == dailyWord.charAt(i)){
                result.setMatchType(Constants.FULL_MATCH);
                if(dailywordMap.get(letter) > 1)
                    dailywordMap.replace(letter, dailywordMap.get(letter) - 1);
                else
                    dailywordMap.remove(letter);
            }
            results.add(result);
        }
        //check for partial matches
        for(int i = 0; i < word.length(); i++){
            char letter = word.charAt(i);
            if(dailywordMap.containsKey(letter) && results.get(i).getMatchType() == null){
                results.get(i).setMatchType(Constants.PARTIAL_MATCH);
                if(dailywordMap.get(letter) > 1)
                    dailywordMap.replace(letter, dailywordMap.get(letter) - 1);
                else
                    dailywordMap.remove(letter);
            }
            else if(!dailywordMap.containsKey(letter) && results.get(i).getMatchType() == null)
                results.get(i).setMatchType(Constants.NO_MATCH);
        }
        return results;
    }

    //Creates a result array for an exact match
    private ArrayList<WordleMatchResult> generateExactMatchResults(String word) {
        ArrayList<WordleMatchResult> results = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            WordleMatchResult current = new WordleMatchResult();
            current.setLetter(word.charAt(i));
            current.setMatchType(Constants.FULL_MATCH);
            results.add(current);
        }
        return results;
    }

    //updates wordle data in user details table
    private void updateWordleDetails(UserDetails userDetails) {
        userDetails.setWordleAttemptLimitReached(true);
        userDetails.setWordleStreak(userDetails.getWordleStreak() + 1);
        userDetails.setWordleSolved(true);
        if(userDetails.getWordleMaxStreak() < userDetails.getWordleStreak())
            userDetails.setWordleMaxStreak(userDetails.getWordleStreak());
        userDetailsRepo.save(userDetails);
    }

    //Takes provided word and uses it to generate a hashmap containing letter counts
    private Map<Character, Integer> populateWordMap(String dailyWord) {
        Map<Character, Integer> wordMap = new HashMap<>();
        for(int i = 0; i < dailyWord.length(); i++){
            char letter = dailyWord.charAt(i);
            if(Character.isAlphabetic(letter)){
                if(!wordMap.containsKey(letter))
                    wordMap.put(letter, 1);
                else
                    wordMap.replace(letter, wordMap.get(letter) + 1);
            }
        }
        return wordMap;
    }
}
