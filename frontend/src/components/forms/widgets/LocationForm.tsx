import { ChangeEvent, FormEvent, useState } from "react"
import * as Constants from "../../../constants/constants"
import locationService from "../../../services/locationService";
import axios from "axios";

interface Props{
    setLocationDetails?: (userCity:string, userState:string, userLongitude:string, userLatitude:string) => void,
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

    //sends request to retrieve current coordinates
    const populateLocationCoordinates = async(event:FormEvent) =>{
        event.preventDefault();
        const states = Array.from(Constants.STATE_CODES.keys())
        let isPresent = false;
        states.forEach(element => {
            if(element.toLowerCase() === state.toLowerCase()){
                isPresent = true
            }
        });
        if(!isPresent)
            alert("Invalid entry. Please provide a valid US state.")
        else{
            try {
                const response = await locationService.getCoordinates(undefined, city, state);
                if(response.status === 200){
                    const longitude = response.data.places[0].longitude;
                    const latitude = response.data.places[0].latitude;
                    setLocationDetails?.(city, state, longitude, latitude);
                    closeWindow();
                }

                else if(response.status === 404)
                    alert("Unable to find location info for the city you entered.")
            } catch (error){
                if(axios.isAxiosError(error))
                    alert(error.response?.data.message);
                else
                    alert(Constants.UNEXPECTED_ERROR_MSG);     
            }
        }

    }

    return(
        <form className="location-form" onSubmit={populateLocationCoordinates}>
            <input type="text" onChange={handleChange} placeholder="Enter City" name="city" value={city} required/>
            <input type="text" onChange={handleChange} placeholder="Enter state" name="state" value={state} required/>
        <button type="submit" className="submit-btn">Submit</button>
    </form> 
    )
}

export default LocationForm;