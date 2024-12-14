import "../../styles/dashboard.css"
import Footer from "../Footer";
import userManagement from "../../services/userManagement";
import * as Constants from "../../constants/constants"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherWidget from "../widgets/WeatherWidget";
import PopupWindow from "../windows/PopupWindow";

const Dashboard = () =>{
    const [name, setName] = useState("");
    const navigator = useNavigate();
    const [submitting, setSubmitting] = useState(false);    
    const [zipcode, setZipcode] = useState("")
    const [getByZip, setGetByZip] = useState(true);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [windowToDisplay, setWindowToDisplay] = useState("");
    
    //send out request to retrieve user details
    const populateUserDetails = async () =>{
        try {
            const response = await userManagement.getUserDetails(sessionStorage.getItem(Constants.SESSION_USER) ||"");
            if(response.status === 200){
                setName(response.data.firstName);
                setZipcode(response.data.zipcode);
            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    }

    useEffect(() =>{populateUserDetails();}, []);

    //Sends request to blacklist auth token and adjusts session storage for route guarding.
    const handleSignOut = async () =>{
        setSubmitting(true);
        
        try {
            const response = await userManagement.signout();
            if(response.status === 200 || response.status === 503){
                navigator("/");
                alert(Constants.SIGNOUT_SUCCESSFUL);
                sessionStorage.removeItem(Constants.SESSION_LOGIN_STATUS);
            }

        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message)
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }

        setSubmitting(false);
    }

    const closeWindow = () =>{
        setWindowToDisplay("");
    };
    
    const setLocationDetails = (userCity:string, userState:string, userLongitude:string,userLatitude:string) =>{
        console.log("remove weather data")
        sessionStorage.removeItem(Constants.SESSION_WEATHER_DATA);
        console.log("weather data removed")
        setCity(userCity);
        setState(userState);
        setLongitude(userLongitude);
        setLatitude(userLatitude)
        //tells widget to get weather info by state and city instead of user home location
        setGetByZip(false);
        //clear weatherdata cache
    }

    const handleCustomLocation = () =>{
        setWindowToDisplay("getCurrentLocation");
    }
    return(
        <div className="home-page">
            <button disabled={submitting} onClick={handleSignOut} className="logout-btn"> Sign out</button>
            <h1 className="title home-page-title">{`Welcome ${name}!`}</h1>
            <div className="widgets">
                {zipcode ?             
                    <div className="weather-widget-cont">
                        <WeatherWidget key={city} zipcode={zipcode} getByZip={getByZip} currentCity={city} currentState={state} currentLongitude={longitude} currentLatitude={latitude}/> 
                        <button onClick={handleCustomLocation} className="weather-widget-btn">Not at home? Click here to get the weather for your current location.</button>
                    </div>
                    : null}
                <PopupWindow windowToDisplay={windowToDisplay} closeWindow={closeWindow} setLocationDetails={setLocationDetails}/>
            </div>
            <Footer/>
        </div>
    )
};

export default Dashboard;