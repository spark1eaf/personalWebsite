import { CSSProperties, MouseEventHandler, useState } from "react";
import WindowCloseBtn from "../buttons/WindowCloseBtn";
import WordleForm from "../forms/widgets/WordleForm";

const WordleWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    const [wordData, setWordData] = useState<WordleResponseObj[]>([]);

    return(
        <>
            <WindowCloseBtn closeWindow={closeWindow} />
            <h1 className="wordle-title">Wordle</h1>
            <div className="letter-container">
                {wordData.length > 0 ?
                    wordData.map((element, index) =>{
                        
                        const letterStyle:CSSProperties = element.matchType !== undefined ? {
                            backgroundColor: element.matchType === "partial" ? '#fffb07' : element.matchType === "full" ? '#28a745': 'white'
                        } :{};

                        return(
                            <div key={index} style={letterStyle} className="letter-block-cont">
                                <p>{element.letter.toUpperCase()}</p>
                            </div>
                        )
                    }):null
                }
            </div>
            <WordleForm setWordData={setWordData} />
        </>

    )
}

export default WordleWindow;