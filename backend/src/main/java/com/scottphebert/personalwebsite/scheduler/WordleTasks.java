package com.scottphebert.personalwebsite.scheduler;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.entity.ScheduledData;
import com.scottphebert.personalwebsite.model.entity.UserDetails;
import com.scottphebert.personalwebsite.repo.ScheduledDataRepo;
import com.scottphebert.personalwebsite.repo.UserDetailsRepo;
import com.scottphebert.personalwebsite.repo.WordRepo;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class WordleTasks {

    @Autowired
    ScheduledDataRepo scheduledDataRepo;

    @Autowired
    WordRepo wordRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    private static final Logger logger = LoggerFactory.getLogger(WordleTasks.class);

    @Scheduled(cron = "0 0 0 * * *")
    public void executeWordleUpdates(){
        logger.info(Constants.EXECUTE_DAILY_WORDLE_UPDATES, LocalDateTime.now());
        updateDailyWord();
        //reset all user wordle attempts
        userDetailsRepo.resetWordleAttemptLimits();
        updateWordleStreak();
    }

    //checks if user solved todays wordle, resetting their streak to 0 if no successful attempt was made
    private void updateWordleStreak() {
        List<UserDetails> userDetailsList = userDetailsRepo.findAll();
        for(UserDetails userDetails: userDetailsList){
            if(!userDetails.isWordleSolved())
                userDetails.setWordleStreak(0);
            userDetails.setWordleSolved(false);
        }
        userDetailsRepo.saveAll(userDetailsList);
    }

    //updates the daily wordle word
    private void updateDailyWord() {
        Random rand = new Random();
        long wordId = rand.nextInt(1,2429);
        String dailyWord = wordRepo.findWordById(wordId)
                .orElseThrow(() -> new EntityNotFoundException(Constants.WORD_NOT_FOUND + wordId));
        ScheduledData data = scheduledDataRepo.findById(1)
                .orElseThrow(() -> new EntityNotFoundException(Constants.DAILY_WORD_NOT_FOUND));
        data.setWordleWord(dailyWord);
        scheduledDataRepo.save(data);
    }

}
