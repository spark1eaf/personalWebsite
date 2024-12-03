package com.scottphebert.personalwebsite.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="userdetails")
public class UserDetails {

    @Id
    private long id;

    @NotEmpty(message = "name is a required field.")
    private String name;

    @NotEmpty(message = "zipcode is a required field.")
    private String zipcode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

