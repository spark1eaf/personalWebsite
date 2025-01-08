import { ChangeEvent, FormEvent, useState } from "react";
import wordleservice from "../../../services/wordleService"
import FormValidation from "../../../utils/FormValidation";

const WordleForm = ({setWordData}: {setWordData: React.Dispatch<React.SetStateAction<WordleResponseObj[]>>}) =>{
    const [word, setWord] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [todaysWord, setTodaysWord] = useState("");
    const [isGuessed, setIsGuessed] = useState(false);

    const handleWordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setWord(event.target.value)
    };
    
    const displayTodaysWord = () =>{
        setTodaysWord("testword");
    }

    //check if user entered a correct guess
    const checkAttempt = (attemptResults:any) =>{
        let guessAttempt = true;
        for(let i = 0; i < 5; i++){
            if(attemptResults[i].matchType !== "full")
                guessAttempt = false;  
        }
        if(guessAttempt){
            sessionStorage.setItem("attemptLimitReached", "true");
            const streak = parseInt(sessionStorage.getItem("streak")||"") + 1;
            const maxStreak = Math.max(streak, parseInt(sessionStorage.getItem("maxStreak")||""));
            sessionStorage.setItem("streak", streak.toString());
            sessionStorage.setItem("maxStreak", maxStreak.toString());
            setIsGuessed(guessAttempt)
        }
    }

    const handleSubmissionAttempt = async(event:FormEvent) =>{
        event.preventDefault();
        if(word.length !== 5)
            alert("Submission must be of length 5");
        else if(FormValidation.isWord(word))
            alert("The word you have entered is invalid. Please try again.");
        else{
            const response = await wordleservice.sendWordleAttempt(sessionStorage.getItem("username") || "", word, attempt);

            if(response.status === 200){
                console.log(response.data)
                const attemptResults = response.data.attemptResults;
                setAttempt(attempt + 1);
                setWordData(attemptResults);
                checkAttempt(response.data.attemptResults);
            }
            else
                alert("Error encountered during submission attempt. Please try again.");
        }
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
    //todo add click event to get todays word. Also should set attempts to maxed out in the session data at this point.
    else{
        return(
            <div className="no-attempts-cont">
                {todaysWord ? 
                    <><p className="todays-word-txt">Todays Word: </p><h1 className="daily-word-txt">{todaysWord.toUpperCase()}</h1></>:
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