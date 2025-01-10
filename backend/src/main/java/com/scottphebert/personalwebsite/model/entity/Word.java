package com.scottphebert.personalwebsite.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name="words")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String word;

    public long getId() { return id;}

    public void setId(long id) { this.id = id;}

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}
