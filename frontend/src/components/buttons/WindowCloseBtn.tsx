import { MouseEventHandler } from "react";

const WindowCloseBtn = ({closeWindow}:{closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return <button className="win-close-btn" onClick={closeWindow}>X</button>;
};

export default WindowCloseBtn;