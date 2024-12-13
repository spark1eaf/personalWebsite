package com.scottphebert.personalwebsite.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name="zipcodes")
public class Zipcode {

    @Id
    private String zip;

    // Getters and setters
    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }
}

