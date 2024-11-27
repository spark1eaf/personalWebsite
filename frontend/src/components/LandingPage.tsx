import { useState } from "react";
import * as Constants from "../constants/constants";
import Footer from "./Footer";
import LoginBtns from "./LoginBtns";
import LoginWindow from "./LoginWindow";
import RegistrationWindow from "./RegistrationWindow";

const LandingPage = ()=>{

    const [windowToDisplay, setWindowToDisplay] = useState("");

    const displayLoginWindow = () =>{
        setWindowToDisplay("login");
    };

    const displayRegistrationWindow = () =>{
        setWindowToDisplay("registration");
    };


    return (
        <div className="landing-page">
            <LoginBtns displayLoginWindow={displayLoginWindow} displayRegistrationWindow={displayRegistrationWindow}/>
            <h1 className="title">Welcome</h1>
            <p className="text-body">{Constants.DUMMY_TEXT}</p>
            {windowToDisplay === "login" ? <LoginWindow/> : windowToDisplay === "registration" ? <RegistrationWindow/> : null}
            <Footer/>
        </div>
    );
    
        
};

export default LandingPage;