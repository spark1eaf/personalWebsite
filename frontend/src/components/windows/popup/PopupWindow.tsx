import { MouseEventHandler, useEffect, useState } from "react";
import LoginWindow from "../usermanagement/LoginWindow";
import RegistrationWindow from "../usermanagement/RegistrationWindow";
import PasswordRecoverWindow from "../usermanagement/PasswordRecoveryWindow";
import GetCurrentLocationWindow from "../weather/CurrentLocationWindow";
import WeeklyForecastWindow from "../weather/WeeklyForecastWindow";
import WordleWindow from "../wordle/WordleWindow";
import * as Constants from "../../../constants/constants";
import "./popupwindow.css"

interface Props{
    windowToDisplay:string,
    closeWindow:MouseEventHandler<HTMLButtonElement>,
    displayRecoveryWindow?:MouseEventHandler<HTMLButtonElement>,
    setLocationDetails?: (userCity:string, userState:string, userLongitude:string, userLatitude:string, userTimezone:number) => void,
    currentTimezone?:number
};

const PopupWindow = ({windowToDisplay, closeWindow, displayRecoveryWindow, setLocationDetails, currentTimezone}:Props) =>{   
    const [classname, setClassname] = useState("popup-window");
     
    const displayMap = new Map([
        [Constants.LOGIN_WINDOW, <LoginWindow displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>],
        [Constants.REGISTRATION_WINDOW, <RegistrationWindow closeWindow={closeWindow}/>],
        [Constants.RECOVERY_WINDOW, <PasswordRecoverWindow closeWindow={closeWindow}/>],
        [Constants.CURRENT_LOC_WINDOW, <GetCurrentLocationWindow closeWindow={closeWindow} setLocationDetails={setLocationDetails}/>],
        [Constants.WEEKLY_FORECAST_WINDOW, <WeeklyForecastWindow closeWindow={closeWindow} currentTimezone={currentTimezone}/>],
        [Constants.WORDLE_WINDOW, <WordleWindow closeWindow={closeWindow}/>]
    ]);

    const componentToDisplay = displayMap.get(windowToDisplay);

    useEffect(() =>{
        if(windowToDisplay === Constants.WEEKLY_FORECAST_WINDOW || windowToDisplay === Constants.WORDLE_WINDOW)
            setClassname("widget-popup-window");
        else if(windowToDisplay === Constants.CURRENT_LOC_WINDOW)
            setClassname("location-popup-window")
        else
            setClassname("popup-window");
    },[windowToDisplay])

    if(windowToDisplay)
        return (
            <>
                <div className="invis-window"></div>
                <div className={classname}>{componentToDisplay}</div>
            </>
        );
};

export default PopupWindow;