import { MouseEventHandler } from "react";
import "./windowclosebtn.css"

const WindowCloseBtn = ({closeWindow}:{closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
        <div className="close-btn-cont">
            <button className="win-close-btn" onClick={closeWindow}>X</button>
        </div>
    )
};

export default WindowCloseBtn;