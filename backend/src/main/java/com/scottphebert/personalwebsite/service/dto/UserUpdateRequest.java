package com.scottphebert.personalwebsite.service.dto;

import jakarta.validation.constraints.NotEmpty;

public class UserUpdateRequest {

    @NotEmpty(message = "email is a required field.")
    private String email;

    @NotEmpty(message = "password is a required field.")
    private String password;

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
