import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/windowclose/WindowCloseBtn";
import LocationForm from "../../forms/widgets/location/LocationForm";
import "./currentlocationwindow.css"

interface Props{
    closeWindow:MouseEventHandler<HTMLButtonElement>|(()=>void)
    setLocationDetails?: (userCity:string, userState:string, userLongitude:string, userLatitude:string, userTimezone:number) => void;
}

const GetCurrentLocationWindow = ({closeWindow, setLocationDetails}: Props) =>{
    return(
        <>
            <WindowCloseBtn closeWindow={closeWindow} />
            <h1 className="get-location-title">Enter Location Details</h1>
            <LocationForm setLocationDetails={setLocationDetails} closeWindow={closeWindow as () => void}/>
        </>
    )
}

export default GetCurrentLocationWindow;