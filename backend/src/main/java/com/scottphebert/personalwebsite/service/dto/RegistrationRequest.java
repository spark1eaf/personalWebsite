package com.scottphebert.personalwebsite.service.dto;

import jakarta.validation.constraints.NotEmpty;

public class RegistrationRequest {

    @NotEmpty(message = "email is a required field")
    private String email;

    @NotEmpty(message = "name is a required field")
    private String name;

    @NotEmpty(message = "zip code is a required field")
    private String zipcode;

    @NotEmpty(message = "username is a required field.")
    private String username;

    @NotEmpty(message = "password is a required field.")
    private String password;

    public @NotEmpty(message = "email is a required field") String getEmail() {
        return email;
    }

    public void setEmail(@NotEmpty(message = "email is a required field") String email) {
        this.email = email;
    }

    public @NotEmpty(message = "name is a required field") String getName() {
        return name;
    }

    public void setName(@NotEmpty(message = "name is a required field") String name) {
        this.name = name;
    }

    public @NotEmpty(message = "zip code is a required field") String getZipcode() {
        return zipcode;
    }

    public void setZipcode(@NotEmpty(message = "zip code is a required field") String zipcode) {
        this.zipcode = zipcode;
    }

    public @NotEmpty(message = "username is a required field.") String getUsername() {
        return username;
    }

    public void setUsername(@NotEmpty(message = "username is a required field.") String username) {
        this.username = username;
    }

    public @NotEmpty(message = "password is a required field.") String getPassword() {
        return password;
    }

    public void setPassword(@NotEmpty(message = "password is a required field.") String password) {
        this.password = password;
    }

}
