package com.scottphebert.personalwebsite.config;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.service.utils.SecretsService;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final SecretsService secretsService;
    private final SecretKey jwtSecret;

    @Autowired
    public JwtTokenProvider(SecretsService secretsService) {
        this.secretsService = secretsService;
        // Fetch the JWT secret from Secrets Manager
        byte[] decodedKey = Base64.getDecoder().decode(secretsService.getSecret(Constants.JWT_SECRET).replaceAll("\\s+", "")); // Remove spaces before decoding
        this.jwtSecret = new SecretKeySpec(decodedKey, 0, decodedKey.length, Constants.ENCODING_ALGO);
    }

    // Generate token for user authentication
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Constants.TOKEN_EXP_TIME))
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    // Get username from token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Check if valid token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch (ExpiredJwtException ex) {
            logger.warn(Constants.TOKEN_EXPIRED_LOG, token);
            return false;
        }
        catch (JwtException | IllegalArgumentException ex) {
            logger.warn(Constants.INVALID_TOKEN_LOG);
            return false;
        }
    }
}
