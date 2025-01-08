
interface Props{
    setWindowToDisplay: React.Dispatch<React.SetStateAction<string>>
}

const WordleWidget = ({setWindowToDisplay}:Props) =>{

    const displayWordleWindow = () =>{
        setWindowToDisplay("wordle")
    };
    //todo need to add conditional here to not show option if wordle has been attempted already today. Also will need to grab the user's current streak and max streak. Probably will grab and add these fields when fetching user details.
    //Current plan is to replace the challenge button with a counter in the case where user has already made an attempt for the day.
        return(
            <>
                <h1 className="wordle-widget-title"> Wordle </h1>
                <p className="wordle-streak">Current Streak: {sessionStorage.getItem("streak")}</p>
                <p className="wordle-streak">Highest Streak: {sessionStorage.getItem("maxStreak")}</p>
                {sessionStorage.getItem("attemptLimitReached") === "true" ?
                    <p className="wordle-attempted-msg">You've already attempted today's wordle challenge.</p>
                    :<button onClick={displayWordleWindow} className="attempt-wordle-btn">Try your daily wordle challenge?</button>
                }
            </>
        )
}

export default WordleWidget;