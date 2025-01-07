import { ChangeEvent, FormEvent, useState } from "react";
import wordleservice from "../../../services/wordleService"
import FormValidation from "../../../utils/FormValidation";

const WordleForm = ({setWordData}: {setWordData: React.Dispatch<React.SetStateAction<WordleResponseObj[]>>}) =>{
    const [word, setWord] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [todaysWord, setTodaysWord] = useState("");

    const handleWordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setWord(event.target.value)
    };

    const handleSubmissionAttempt = async(event:FormEvent) =>{
        event.preventDefault();
        if(word.length !== 5)
            alert("Submission must be of length 5");
        else if(FormValidation.isWord(word))
            alert("The word you have entered is invalid. Please try again.");
        else{
            const requestData:WordleAttemptData = {
                username: sessionStorage.getItem("username") || "",
                word:word,
                attemptNum:attempt
            }
            const response = await wordleservice.sendWordleAttempt(requestData);

            if(response.status === 200){
                const tempResponse:WordleResponseObj[] = [{letter:"b", matchType:"partial"},{letter:"r", matchType:"full"},{letter:"e", matchType:"none"},{letter:"a", matchType:"none"},{letter:"k", matchType:"none"}]
                setAttempt(attempt + 1);
                setWordData(tempResponse);
            }
            else
                alert("Error encountered during submission attempt. Please try again.");
        }
    }

    const displayTodaysWord = () =>{
        setTodaysWord("testword");
    }

    if(attempt < 5){
        return(
            <form className="wordle-form" onSubmit={handleSubmissionAttempt}>
                <p>Attempts left: {5-attempt}</p>
                <input type="text" onChange={handleWordChange} placeholder="Enter Your Guess" name="city" value={word} required/>
                <button type="submit" className="wordle-submit-btn">Submit</button>
            </form> 
        )
    }
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