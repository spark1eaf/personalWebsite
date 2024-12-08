package com.scottphebert.personalwebsite.service.utils;

import org.springframework.http.ResponseEntity;

public interface SecretsService {

    String getSecret(String secret);
}
