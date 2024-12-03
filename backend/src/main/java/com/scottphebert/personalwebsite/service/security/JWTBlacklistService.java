package com.scottphebert.personalwebsite.service.security;

public interface JWTBlacklistService {
    public void addToList(String token);
    public boolean isBlackListed(String token);
}
