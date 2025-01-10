package com.scottphebert.personalwebsite.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name="scheduled_data")
public class ScheduledData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String wordleWord;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWordleWord() {
        return wordleWord;
    }

    public void setWordleWord(String wordleWord) {
        this.wordleWord = wordleWord;
    }

}
