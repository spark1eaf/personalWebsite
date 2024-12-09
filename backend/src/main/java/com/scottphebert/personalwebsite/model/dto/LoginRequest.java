package com.scottphebert.personalwebsite.model.dto;

import jakarta.validation.constraints.NotEmpty;

public class LoginRequest {

    @NotEmpty(message = "username is a required field.")
    private String username;

    @NotEmpty(message = "password is a required field.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
