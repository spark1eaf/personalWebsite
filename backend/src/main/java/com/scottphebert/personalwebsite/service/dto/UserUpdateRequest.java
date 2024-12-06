package com.scottphebert.personalwebsite.service.dto;

import jakarta.validation.constraints.NotEmpty;

public class UserUpdateRequest {

    @NotEmpty(message = "email is a required field.")
    private String email;

    @NotEmpty(message = "username is a required field.")
    private String username;

    @NotEmpty(message = "password is a required field.")
    private String password;

    public String getUsername() {return username; }

    public void setUsername(String username) { this.username = username; }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
