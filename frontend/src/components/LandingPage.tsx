import { useState } from "react";
import * as Constants from "../constants/constants";
import Footer from "./Footer";
import LoginBtns from "./buttons/LoginBtns";
import PopupWindow from "./windows/PopupWindow";

const LandingPage = ()=>{

    const [windowToDisplay, setWindowToDisplay] = useState("");

    const displayLoginWindow = () =>{
        setWindowToDisplay("login");
    };
    const displayRegistrationWindow = () =>{
        setWindowToDisplay("registration");
    };
    const displayRecoveryWindow = () =>{
        setWindowToDisplay("recovery");
    };
    const closeWindow = () =>{
        setWindowToDisplay("");
    };

    return (
        <div className="landing-page">
            <LoginBtns displayLoginWindow={displayLoginWindow} displayRegistrationWindow={displayRegistrationWindow}/>
            <h1 className="title">Welcome</h1>
            <p className="text-body">{Constants.DUMMY_TEXT}</p>
            <PopupWindow windowToDisplay={windowToDisplay} displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>
            <Footer/>
        </div>
    );
    
        
};

export default LandingPage;