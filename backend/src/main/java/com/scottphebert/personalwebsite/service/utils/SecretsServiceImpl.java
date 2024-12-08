package com.scottphebert.personalwebsite.service.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
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
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    // Method to fetch secrets from Secrets Manager
    public String getSecret(String secret) {


        Region region = Region.of("us-east-1");  // Adjust region if necessary
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(region)
                .build();

        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(Constants.JWT_SECRET)
                .build();
        try {
            return new ObjectMapper()
                    .readTree(client.getSecretValue(getSecretValueRequest).secretString())
                    .get(Constants.JWT_SECRET)
                    .asText();
        } catch (JsonProcessingException e) {
            logger.error("Error retrieving secret key: {}", "jwt-secret");
            throw new RuntimeException("Failed to parse secret value", e);
        }
    }
}

