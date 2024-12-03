package com.scottphebert.personalwebsite.config;

import com.scottphebert.personalwebsite.common.Constants;
import io.jsonwebtoken.*;
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
    byte[] decodedKey = Base64.getDecoder().decode(dotenv.get(Constants.JWT_SECRET).replaceAll("\\s+", "")); // Remove spaces before decoding
    private final SecretKey jwtSecret =  new SecretKeySpec(decodedKey, 0, decodedKey.length, Constants.ENCODING_ALGO);

    // generate token for user authentication
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Constants.TOKEN_EXP_TIME))
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

    // check if valid token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch (ExpiredJwtException ex) {
            System.out.println(Constants.TOKEN_EXPIRED + ex.getMessage());
            return false;
        }
        catch (JwtException | IllegalArgumentException ex) {
            System.out.println(Constants.INVALID_TOKEN + ": " + ex.getMessage());
            return false;
        }
    }
}
