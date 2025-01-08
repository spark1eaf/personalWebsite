package com.scottphebert.personalwebsite.service.wordle;

import com.scottphebert.personalwebsite.model.dto.WordleResponse;
import org.springframework.http.ResponseEntity;

public interface WordleService {

    ResponseEntity<Object> processWordleAttempt(String username, String word, int attemptNum);

}
