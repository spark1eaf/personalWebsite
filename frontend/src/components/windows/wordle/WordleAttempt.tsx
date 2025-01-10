import { CSSProperties } from "react";

const WordleAttempt = ({attempt}: {attempt:WordleResponse}) =>{
    return(
        <div className="attempt-container">
        {attempt.response && attempt.response.length > 0 ?
            attempt.response.map((element, index) =>{
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
    )
}

export default WordleAttempt;