import { ChangeEvent, FormEvent, useState } from "react";
import wordleservice from "../../../../services/wordleService"
import FormValidation from "../../../../utils/FormValidation";
import * as Constants from "../../../../constants/constants";
import "./wordleform.css"

interface Props{
    attemptData: WordleResponse[]
    setAttemptData: React.Dispatch<React.SetStateAction<WordleResponse[]>>
}

const WordleForm = ({attemptData: attemptData, setAttemptData: setAttemptData}: Props) =>{
    const [word, setWord] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [todaysWord, setTodaysWord] = useState("");
    const [isGuessed, setIsGuessed] = useState(false);

    const handleWordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setWord(event.target.value)
    };
    
    const displayTodaysWord = async() =>{
        const response = await wordleservice.retrieveTodaysWord(Constants.SESSION_USERNAME);
        if(response.status === 200)
            setTodaysWord(response.data);
        else
            alert(Constants.UNEXPECTED_ERROR_MSG);
    }

    //check if user entered a correct guess
    const checkAttempt = (attemptResults:any) =>{
        let guessAttempt = true;
        for(let i = 0; i < 5; i++){
            if(attemptResults[i].matchType !== "full")
                guessAttempt = false;  
        }
        if(guessAttempt){
            sessionStorage.setItem(Constants.SESSION_ATTEMPT_LIMIT_REACHED, "true");
            const streak = parseInt(sessionStorage.getItem(Constants.SESSION_STREAK)||"") + 1;
            const maxStreak = Math.max(streak, parseInt(sessionStorage.getItem(Constants.SESSION_MAX_STREAK)||""));
            sessionStorage.setItem(Constants.SESSION_STREAK, streak.toString());
            sessionStorage.setItem(Constants.SESSION_MAX_STREAK, maxStreak.toString());
            setIsGuessed(guessAttempt)
        }
    }

    const handleSubmissionAttempt = async(event:FormEvent) =>{
        event.preventDefault();
        if(word.length !== 5)
            alert(Constants.INVALID_WORDLE_LENGTH);
        else if(FormValidation.isWord(word))
            alert(Constants.INVALID_WORD_MSG);
        else{
            const response = await wordleservice.sendWordleAttempt(sessionStorage.getItem(Constants.SESSION_USERNAME) || "", word, attempt + 1);

            if(response.status === 200){
                if(attempt + 1 === 5)
                    sessionStorage.setItem(Constants.SESSION_ATTEMPT_LIMIT_REACHED, "true");
                setAttempt(attempt + 1);
                
                const attemptResults:WordleResponse = {response:response.data.attemptResults};
                const updatedAttemptData: WordleResponse[] = [...attemptData, attemptResults];
                setAttemptData(updatedAttemptData);
                checkAttempt(response.data.attemptResults);
            }
            else
                alert(Constants.ERROR_TRY_AGAIN_MSG);
        }
        setWord("")
    }
    //user makes a correct guess
    if(isGuessed){
        return(
            <div className="successful-attempt-cont">
                <h1>Congratulations!</h1>
                <p>You guessed the word with {5-attempt} attempts remaining.</p>
            </div>
        )
    }
    //user has attempts left
    else if(attempt < 5){
        return(
            <form className="wordle-form" onSubmit={handleSubmissionAttempt}>
                <p>Attempts left: {5-attempt}</p>
                <input type="text" onChange={handleWordChange} placeholder="Enter Your Guess" name="city" value={word} required/>
                <button type="submit" className="wordle-submit-btn">Submit</button>
            </form> 
        )
    }
    //no attempts
    else{
        return(
            <div className="no-attempts-cont">
                {todaysWord ? 
                    <>
                        <p className="todays-word-txt">Todays Word: </p>
                        <h1 className="daily-word-txt">{todaysWord.toUpperCase()}</h1>
                    </>:
                    <>
                        <p className="no-attempts-msg">Out of attempts. Would you like to see what the day's word is?</p>
                        <button className="get-word-btn" onClick={displayTodaysWord}>Show Word</button>
                    </>
                }
            </div>
        )
    }
}

export default WordleForm;