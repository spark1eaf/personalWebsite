package com.scottphebert.personalwebsite.service.security;

import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class JWTBlacklistServiceImpl implements JWTBlacklistService{
    private final Set<String> blacklistedTokens = new HashSet<>();

    //add token to list
    public void addToList(String token) {
        blacklistedTokens.add(token);
    }

    //check if token exists in list
    public boolean isBlackListed(String token) {
        return blacklistedTokens.contains(token);
    }
}
