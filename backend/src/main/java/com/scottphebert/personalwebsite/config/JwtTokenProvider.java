package com.scottphebert.personalwebsite.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import io.github.cdimascio.dotenv.Dotenv;

@Component
public class JwtTokenProvider {
//    SecretKey key =  Keys.secretKeyFor(SignatureAlgorithm.HS512);
//    String stringKey = Base64.getEncoder().encodeToString(key.getEncoded());
    Dotenv dotenv = Dotenv.configure().load();
    byte[] decodedKey = Base64.getDecoder().decode(dotenv.get("JWT_SECRET").replaceAll("\\s+", "")); // Remove spaces before decoding
    private final SecretKey jwtSecret =  new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA512");

    // generate token for user authentication
    public String generateToken(String username) {
        // 1 hour expiration
        long jwtExpirationInMs = 3600000;
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    // get username from token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // check if token is valid
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(token);
            return true;
            //if expired
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
            return false;
            //if invalid
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid token: " + e.getMessage());
            return false;
        }
    }
}
