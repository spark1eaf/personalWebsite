import "./dashboard.css"
// import "../../../styles/dashboard.css"
import userManagementService from "../../../services/userManagementService";
import * as Constants from "../../../constants/constants"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import PopupWindow from "../../windows/PopupWindow";
import WeatherWidget from "../../widgets/weather/WeatherWidget";
import WordleWidget from "../../widgets/wordle/WordleWidget";
import LeetcodeWidget from "../../widgets/leetcode/LeetcodeWidget";
import Footer from "../../footer/Footer";

const Dashboard = () =>{
    const navigator = useNavigate();
    const [submitting, setSubmitting] = useState(false);    
    const [name, setName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [getByZip, setGetByZip] = useState(true);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [timezone, setTimezone] = useState<number | undefined>(undefined);
    const [windowToDisplay, setWindowToDisplay] = useState("");
    document.title = `Dashboard`;
    
    //send out request to retrieve user details
    const populateUserDetails = async () =>{
        try {
            const response = await userManagementService.getUserDetails(sessionStorage.getItem(Constants.SESSION_USERNAME) ||"");
            if(response.status === 200){
                setName(response.data.firstName);
                setZipcode(response.data.zipcode);
                sessionStorage.setItem(Constants.SESSION_STREAK, response.data.wordleStreak);
                sessionStorage.setItem(Constants.SESSION_MAX_STREAK, response.data.wordleMaxStreak);
                sessionStorage.setItem(Constants.SESSION_ATTEMPT_LIMIT_REACHED, response.data.wordleAttemptLimitReached);
            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    }

    useEffect(() =>{populateUserDetails();}, []);

    //Sends request to blacklist auth token and clears session storage.
    const handleSignOut = async () =>{
        setSubmitting(true);
        
        try {
            const response = await userManagementService.signout();
            if(response.status === 200 || response.status === 503){
                navigator("/");
                sessionStorage.clear();
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
    
    const setLocationDetails = (userCity:string, userState:string, userLongitude:string, userLatitude:string, timezone:number) =>{
        sessionStorage.removeItem(Constants.SESSION_WEATHER_DATA);
        setCity(userCity);
        setState(userState);
        setLongitude(userLongitude);
        setLatitude(userLatitude)
        setTimezone(timezone);
        //tells widget to get weather info by state and city instead of user home location
        setGetByZip(false);
        //clear weatherdata cache
    }

    return(
        <div className="dashboard">
            <div className="logout-btn-cont">
                <button disabled={submitting} onClick={handleSignOut} className="logout-btn"> Sign out</button>
            </div>
            <h1 className="title dashboard-title">{`Welcome ${name}!`}</h1>
            <div className="widgets">
                    <WordleWidget setWindowToDisplay={setWindowToDisplay}/> 
                    {zipcode ?             
                        <WeatherWidget key={timezone} zipcode={zipcode} getByZip={getByZip} currentCity={city} currentState={state} currentLongitude={longitude} currentLatitude={latitude} currentTimezone={timezone} setWindowToDisplay={setWindowToDisplay}/> 
                    : null}
                    <LeetcodeWidget/>
            </div>
            <PopupWindow windowToDisplay={windowToDisplay} closeWindow={closeWindow} setLocationDetails={setLocationDetails} currentTimezone={timezone}/>
            <Footer/>
        </div>
    )
};

export default Dashboard;