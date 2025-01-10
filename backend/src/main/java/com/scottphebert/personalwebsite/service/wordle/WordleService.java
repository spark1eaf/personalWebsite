package com.scottphebert.personalwebsite.service.wordle;

import org.springframework.http.ResponseEntity;

public interface WordleService {

    ResponseEntity<Object> processWordleAttempt(String username, String word, int attemptNum);

    ResponseEntity<String> retrieveDailyWord();
}
