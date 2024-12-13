import { MouseEventHandler } from "react";
import LoginWindow from "./usermanagement/LoginWindow";
import RegistrationWindow from "./usermanagement/RegistrationWindow";
import PasswordRecoverWindow from "./usermanagement/PasswordRecoveryWindow";
import GetCurrentLocationWindow from "./GetCurrentLocationWindow";

interface Props{
    windowToDisplay:string,
    closeWindow:MouseEventHandler<HTMLButtonElement>
    displayRecoveryWindow?:MouseEventHandler<HTMLButtonElement>,
    setLocationDetails?: (userCity:string, userState:string, userLongitude:string, userLatitude:string) => void
};

const PopupWindow = ({windowToDisplay, closeWindow, displayRecoveryWindow, setLocationDetails}:Props) =>{   
     
    const displayMap = new Map([
        ["login", <LoginWindow displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>],
        ["registration", <RegistrationWindow closeWindow={closeWindow}/>],
        ["recovery", <PasswordRecoverWindow closeWindow={closeWindow}/>],
        ["getCurrentLocation", <GetCurrentLocationWindow closeWindow={closeWindow} setLocationDetails={setLocationDetails}/>]
    ]);

    const componentToDisplay = displayMap.get(windowToDisplay);
    if(windowToDisplay)
        return (
            <>
                <div className="invis-window"></div>
                <div className="popup-window">{componentToDisplay}</div>
            </>
        );
};

export default PopupWindow;