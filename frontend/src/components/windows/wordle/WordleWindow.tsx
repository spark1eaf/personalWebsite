import {MouseEventHandler, useState } from "react";
import WindowCloseBtn from "../../buttons/WindowCloseBtn";
import WordleForm from "../../forms/widgets/WordleForm";
import AttemptContainerCreator from "./AttemptContainerCreator";

const WordleWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    const [attemptData, setAttemptData] = useState<WordleResponse[]>([]);
    return(
        <>
            <WindowCloseBtn closeWindow={closeWindow} />
            <h1 className="wordle-title">Wordle</h1>
            <AttemptContainerCreator attemptData={attemptData}/>
            <WordleForm attemptData={attemptData} setAttemptData={setAttemptData} />
        </>

    )
}

export default WordleWindow;