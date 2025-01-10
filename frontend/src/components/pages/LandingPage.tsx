import { useEffect, useState } from "react";
import LoginBtns from "../buttons/LoginBtns";
import Footer from "../Footer";
import PopupWindow from "../windows/PopupWindow";
import "../../styles/landingpage.css"
import userManagementService from "../../services/userManagementService";
import { useNavigate } from "react-router-dom";
import * as Constants from "../../constants/constants"
import axios from "axios";

const LandingPage = ()=>{
    
    const [windowToDisplay, setWindowToDisplay] = useState("");
    const navigator = useNavigate();

    const displayLoginWindow = () =>{
        setWindowToDisplay(Constants.LOGIN_WINDOW);
    };
    const displayRegistrationWindow = () =>{
        setWindowToDisplay(Constants.REGISTRATION_WINDOW);
    };
    const displayRecoveryWindow = () =>{
        setWindowToDisplay(Constants.RECOVERY_WINDOW);
    };
    const closeWindow = () =>{
        setWindowToDisplay(Constants.NO_WINDOW);
    };
    //check if user is already logged in, in which case redirects to homepage
    const checkLoginStatus = async() =>{
            try {
                const response = await userManagementService.getLoginStatus(sessionStorage.getItem(Constants.SESSION_USERNAME) ||""); 
                if (response.status === 200 && response.data === Constants.LOGIN_CHECK_RESPONSE)
                    navigator(Constants.DASHBOARD)
            } catch (error) {
                if(axios.isAxiosError(error))
                    console.error(error.response?.data.message);
                else
                    console.error(Constants.UNEXPECTED_ERROR_MSG); 
            }
    };

    useEffect(() =>{
        if(sessionStorage.getItem(Constants.SESSION_LOGIN_STATUS))
            checkLoginStatus();
    },[]);

    return (
        <div className="landing-page">
            <LoginBtns displayLoginWindow={displayLoginWindow} displayRegistrationWindow={displayRegistrationWindow}/>
            <h1 className="title landing-title">About</h1>
            <p className="feature-prefix">{Constants.ABOUT_TEXT_PREFIX}</p>
            <ul className="site-features">
                <li>{Constants.ABOUT_TEXT_LOGIN}</li>
                <li>{Constants.ABOUT_TEXT_WEATHER}</li>
                <li>{Constants.ABOUT_TEXT_WORDLE}</li>
            </ul>
            <PopupWindow windowToDisplay={windowToDisplay} displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>
             <Footer/>
        </div>
    );
};

export default LandingPage;