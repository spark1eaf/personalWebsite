package com.scottphebert.personalwebsite.service.dto;

import jakarta.validation.constraints.NotEmpty;

public class RegistrationRequest {

    @NotEmpty(message = "email is a required field")
    private String email;

    @NotEmpty(message = "firstName is a required field")
    private String firstName;

    @NotEmpty(message = "lastName is a required field")
    private String lastName;

    @NotEmpty(message = "zip code is a required field")
    private String zipcode;

    @NotEmpty(message = "username is a required field.")
    private String username;

    @NotEmpty(message = "password is a required field.")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
