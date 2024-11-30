package com.scottphebert.personalwebsite.config;

public class JwtResponse {
    private final String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String getType() {
        return "Bearer";
    }
}
