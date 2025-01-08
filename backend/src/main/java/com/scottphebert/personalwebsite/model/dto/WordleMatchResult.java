package com.scottphebert.personalwebsite.model.dto;

public class WordleMatchResult {

    private Character letter;
    private String matchType;

    public Character getLetter() {
        return letter;
    }

    public void setLetter(Character letter) {
        this.letter = letter;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }
}
