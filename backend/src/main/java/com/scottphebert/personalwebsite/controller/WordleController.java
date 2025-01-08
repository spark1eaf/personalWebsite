package com.scottphebert.personalwebsite.controller;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.model.dto.WordleResponse;
import com.scottphebert.personalwebsite.service.wordle.WordleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constants.PREFIX)
public class WordleController {

    @Autowired
    WordleService wordleService;

    private static final Logger logger = LoggerFactory.getLogger(WordleController.class);

    @PostMapping("/wordleattempt")
    public ResponseEntity<Object> attemptWordle(@RequestParam String username, @RequestParam String word, @RequestParam int attemptNum){
        logger.info("Processing wordle attempt for user: {}", username);
        return wordleService.processWordleAttempt(username, word, attemptNum);
    }
}
