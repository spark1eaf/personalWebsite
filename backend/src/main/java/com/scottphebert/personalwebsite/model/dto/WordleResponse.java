package com.scottphebert.personalwebsite.model.dto;

import java.util.ArrayList;

public class WordleResponse {

    private ArrayList<WordleMatchResult> attemptResults;

    public ArrayList<WordleMatchResult> getAttemptResults() {
        return attemptResults;
    }

    public void setAttemptResults(ArrayList<WordleMatchResult> attemptResults) {
        this.attemptResults = attemptResults;
    }
}
