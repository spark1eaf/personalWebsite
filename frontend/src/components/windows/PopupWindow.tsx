import { MouseEventHandler } from "react";
import LoginWindow from "./LoginWindow";
import RegistrationWindow from "./RegistrationWindow";
import PasswordRecoverWindow from "./PasswordRecoveryWindow";

interface Props{
    windowToDisplay:string,
    displayRecoveryWindow:MouseEventHandler<HTMLButtonElement>,
    closeWindow:MouseEventHandler<HTMLButtonElement>
}

const PopupWindow = ({windowToDisplay, displayRecoveryWindow, closeWindow}:Props) =>{   
     
    const displayMap = new Map([
        ["login", <LoginWindow displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>],
        ["registration", <RegistrationWindow closeWindow={closeWindow}/>],
        ["recovery", <PasswordRecoverWindow closeWindow={closeWindow}/>]
    ]);
    const componentToDisplay = displayMap.get(windowToDisplay);
    
    if(windowToDisplay)
        return (
            <>
                <div className="invis-window"></div>
                <div className="popup-window">
                    {componentToDisplay}
                </div>
            </>
        );
};

export default PopupWindow;