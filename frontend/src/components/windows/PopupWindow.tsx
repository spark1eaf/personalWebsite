import { MouseEventHandler, useEffect, useState } from "react";
import LoginWindow from "./usermanagement/LoginWindow";
import RegistrationWindow from "./usermanagement/RegistrationWindow";
import PasswordRecoverWindow from "./usermanagement/PasswordRecoveryWindow";
import GetCurrentLocationWindow from "./weather/GetCurrentLocationWindow";
import WeeklyForecastWindow from "./weather/WeeklyForecastWindow";
import WordleWindow from "./WordleWindow";

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
        ["login", <LoginWindow displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>],
        ["registration", <RegistrationWindow closeWindow={closeWindow}/>],
        ["recovery", <PasswordRecoverWindow closeWindow={closeWindow}/>],
        ["getCurrentLocation", <GetCurrentLocationWindow closeWindow={closeWindow} setLocationDetails={setLocationDetails}/>],
        ["displayWeeklyForecast", <WeeklyForecastWindow closeWindow={closeWindow} currentTimezone={currentTimezone}/>],
        ["wordle", <WordleWindow closeWindow={closeWindow}/>]
    ]);

    const componentToDisplay = displayMap.get(windowToDisplay);

    useEffect(() =>{
        if(windowToDisplay === "displayWeeklyForecast" || windowToDisplay === "wordle")
            setClassname("widget-popup-window");
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