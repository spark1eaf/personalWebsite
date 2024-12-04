package com.scottphebert.personalwebsite.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="userdetails")
public class UserDetails {

    @Id
    private long id;

    @NotEmpty(message = "firstName is a required field.")
    private String firstName;

    @NotEmpty(message = "lastName is a required field.")
    private String lastName;

    @NotEmpty(message = "zipcode is a required field.")
    private String zipcode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", unique = true, nullable = false)
    @JsonIgnore
    private User user;

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
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}

