package com.scottphebert.personalwebsite.config;

import com.scottphebert.personalwebsite.common.Constants;

public class JwtResponse {
    private final String token;
    private final String type = Constants.BEARER.trim();

    public JwtResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
    public String getType() {
        return type;
    }
}
