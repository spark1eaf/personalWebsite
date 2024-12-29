package com.scottphebert.personalwebsite.service.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.config.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Service
public class SecretsServiceImpl implements SecretsService {
    private static final Logger logger = LoggerFactory.getLogger(SecretsServiceImpl.class);

    // fetch secrets from AWS secrets manager
    public String getSecret(String secret) {
        Region region = Region.of(Constants.AWS_REGION);  // Adjust region if necessary
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(region)
                .build();

        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(secret)
                .build();
        GetSecretValueResponse aa = client.getSecretValue(getSecretValueRequest);
        String a = aa.secretString();
        try {
            if (secret.equals(Constants.DB_SECRET_NAME))
                return client.getSecretValue(getSecretValueRequest).secretString();
            else
                return new ObjectMapper()
                        .readTree(client.getSecretValue(getSecretValueRequest).secretString())
                        .get(secret)
                        .asText();
        } catch (JsonProcessingException ex) {
            logger.error(Constants.SECRET_RETRIEVAL_ERROR_LOG, secret);
            throw new RuntimeException(Constants.PARSING_FAILURE, ex);
        }
    }
}

