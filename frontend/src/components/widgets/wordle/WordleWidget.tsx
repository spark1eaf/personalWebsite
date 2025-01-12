import * as Constants from "../../../constants/constants"
import "./wordlewidget.css"

const WordleWidget = ({setWindowToDisplay}: {setWindowToDisplay: React.Dispatch<React.SetStateAction<string>>}) =>{

    const displayWordleWindow = () =>{
        setWindowToDisplay(Constants.WORDLE_WINDOW)
    };
        return(
            <div className="widget-cont">
                <h1 className="wordle-widget-title"> Wordle </h1>
                <p className="wordle-streak">Current Streak: {sessionStorage.getItem(Constants.SESSION_STREAK)}</p>
                <p className="wordle-streak">Highest Streak: {sessionStorage.getItem(Constants.SESSION_MAX_STREAK)}</p>
                {sessionStorage.getItem("attemptLimitReached") === "true" ?
                    <p className="wordle-attempted-msg">You've already attempted today's wordle challenge.</p>
                    :<button onClick={displayWordleWindow} className="attempt-wordle-btn">Try daily wordle challenge?</button>
                }
            </div>
        )
}

export default WordleWidget;