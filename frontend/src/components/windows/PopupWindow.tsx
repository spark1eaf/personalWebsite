import { MouseEventHandler, useEffect, useState } from "react";
import LoginWindow from "./usermanagement/LoginWindow";
import RegistrationWindow from "./usermanagement/RegistrationWindow";
import PasswordRecoverWindow from "./usermanagement/PasswordRecoveryWindow";
import GetCurrentLocationWindow from "./weather/GetCurrentLocationWindow";
import DisplayWeeklyForecastWindow from "./weather/DisplayWeeklyForecastWindow";

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
        ["displayWeeklyForecast", <DisplayWeeklyForecastWindow closeWindow={closeWindow} currentTimezone={currentTimezone}/>]
    ]);

    const componentToDisplay = displayMap.get(windowToDisplay);

    useEffect(() =>{
        if(windowToDisplay === "displayWeeklyForecast")
            setClassname("forecast-popup-window");
        else
            setClassname("popup-window")
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