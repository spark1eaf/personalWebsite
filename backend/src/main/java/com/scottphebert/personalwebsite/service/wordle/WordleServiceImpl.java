package com.scottphebert.personalwebsite.service.wordle;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.dto.WordleMatchResult;
import com.scottphebert.personalwebsite.model.dto.WordleResponse;
import com.scottphebert.personalwebsite.model.entity.User;
import com.scottphebert.personalwebsite.model.entity.UserDetails;
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

@Service
public class WordleServiceImpl implements WordleService {

    private static final Logger logger = LoggerFactory.getLogger(WordleServiceImpl.class);

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    public ResponseEntity<Object> evaluateAttempt(String word, UserDetails userDetails){

        //mock daily word for now
        String dailyWord = "break";
        WordleResponse response = new WordleResponse();

        if(word.length() != 5)
            return new ResponseEntity<>("Invalid Length, word must be of length 5.", HttpStatus.BAD_REQUEST);
        else if(dailyWord.equals(word.toLowerCase())){
            //update details appropriately if word matches daily word
            userDetails.setWordleAttemptLimitReached(true);
            userDetails.setWordleStreak(userDetails.getWordleStreak() + 1);
            if(userDetails.getWordleMaxStreak() < userDetails.getWordleStreak())
                userDetails.setWordleMaxStreak(userDetails.getWordleStreak());

            ArrayList<WordleMatchResult> results = new ArrayList<>();

            for(int i = 0; i < 5; i++){
                WordleMatchResult current = new WordleMatchResult();
                current.setLetter(word.charAt(i));
                current.setMatchType("full");
                results.add(current);
            }
            response.setAttemptResults(results);
        }
        else{
            ArrayList<WordleMatchResult> results = new ArrayList<>();
            //mock for now
            WordleMatchResult current1 = new WordleMatchResult();

            current1.setLetter('t');
            current1.setMatchType("full");
            results.add(current1);

            WordleMatchResult current2 = new WordleMatchResult();
            current2.setLetter('e');
            current2.setMatchType("partial");
            results.add(current2);

            WordleMatchResult current3 = new WordleMatchResult();
            current3.setLetter('s');
            current3.setMatchType("none");
            results.add(current3);

            WordleMatchResult current4 = new WordleMatchResult();
            current4.setLetter('t');
            current4.setMatchType("partial");
            results.add(current4);

            WordleMatchResult current5 = new WordleMatchResult();
            current5.setLetter('s');
            current5.setMatchType("full");
            results.add(current5);

            response.setAttemptResults(results);
        }
        try {
            userDetailsRepo.save(userDetails);
        }
        catch (Exception ex){
            logger.error("An error occurred while attempting to update userDetails for userId: {}", userDetails.getId());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<Object> processWordleAttempt(String username, String word, int attemptNum){

        try {
            User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(new EntityNotFoundException(Constants.USER_NOT_FOUND_USERNAME + username)));
            UserDetails userDetails = userDetailsRepo.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(Constants.USER_DETAILS_NOT_FOUND + user.getId()));
            if(!userDetails.isWordleAttemptLimitReached()){
                if(attemptNum == 5)
                    userDetails.setWordleAttemptLimitReached(true);
                return evaluateAttempt(word, userDetails);
            }
            else
                return new ResponseEntity<>("User has already reached attempt limit for today." , HttpStatus.OK);
        } catch (Exception ex) {
            //todo need to check logging here
            logger.error(ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
