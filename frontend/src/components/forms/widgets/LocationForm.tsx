import { ChangeEvent, FormEvent, useState } from "react"
import * as Constants from "../../../constants/constants"
import locationService from "../../../services/locationService";
import { DateTime } from 'luxon';


interface Props{
    setLocationDetails?: (userCity:string, userState:string, userLongitude:string, userLatitude:string, userTimezone:number) => void,
    closeWindow:()=>void
};

const LocationForm = ({setLocationDetails, closeWindow}:Props) =>{
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        switch (event.target.name) {
            case "city":
                setCity(event.target.value);
                break;
            case "state":
                setState(event.target.value);
                break;
          }
    };

    //sends request to retrieve current coordinates and timezone
    const populateLocationDetails = async(event:FormEvent) =>{
        event.preventDefault();
        const states = Array.from(Constants.STATE_CODES.keys())
        let isPresent = false;
        states.forEach(element => {
            if(element.toLowerCase() === state.toLowerCase()){
                isPresent = true;
            }
        });
        if(!isPresent)
            alert(Constants.INVALID_STATE_ERROR);
        else{
            //get coordinates
            const coordinatesAPIResponse = await locationService.getCoordinates(undefined, city, state);
            if(coordinatesAPIResponse.status === 200 ){
                const longitude = coordinatesAPIResponse.data.places[0].longitude;
                const latitude = coordinatesAPIResponse.data.places[0].latitude;

                //get timezone
                const timezoneAPIResponse = await locationService.getTimezone(latitude, longitude);
                let timezone = 0
                if(timezoneAPIResponse.status === 200 && timezoneAPIResponse.data.gmtOffset){
                    if(DateTime.now().isInDST)
                        timezone = timezoneAPIResponse.data.dstOffSet;
                    else
                        timezone = timezoneAPIResponse.data.gmtOffset;
                }
                else
                    alert(Constants.UNABLE_TO_FIND_LOC_INFO);

                setLocationDetails?.(city, state, longitude, latitude, timezone);
                closeWindow();
            }
            else if(coordinatesAPIResponse.status === 404)
                alert(Constants.UNABLE_TO_FIND_LOC_INFO);
        }

    }

    return(
        <form className="location-form" onSubmit={populateLocationDetails}>
            <input type="text" onChange={handleChange} placeholder="Enter City" name="city" value={city} required/>
            <input type="text" onChange={handleChange} placeholder="Enter state" name="state" value={state} required/>
        <button type="submit" className="submit-btn">Submit</button>
    </form> 
    )
}

export default LocationForm;