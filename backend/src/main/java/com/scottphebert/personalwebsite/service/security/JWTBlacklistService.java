package com.scottphebert.personalwebsite.service.security;

public interface JWTBlacklistService {

    void addToList(String token);
    boolean isBlackListed(String token);
}
