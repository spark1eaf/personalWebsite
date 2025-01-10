package com.scottphebert.personalwebsite.controller;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.service.wordle.WordleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.PREFIX)
public class WordleController {

    @Autowired
    WordleService wordleService;

    private static final Logger logger = LoggerFactory.getLogger(WordleController.class);

    @PostMapping(Constants.WORDLE_ATTEMPT_URL)
    public ResponseEntity<Object> attemptWordle(@RequestParam String username, @RequestParam String word, @RequestParam int attemptNum){
        logger.info(Constants.PROCESS_WORDLE_ATTEMPT_LOG, username);
        return wordleService.processWordleAttempt(username, word, attemptNum);
    }

    @GetMapping(Constants.GET_DAILY_WORD_URL)
    public ResponseEntity<String> getDailyWord(@RequestParam String username){
        logger.info(Constants.DAILY_WORD_REQUESTED_LOG, username);
        return wordleService.retrieveDailyWord();
    }
}
