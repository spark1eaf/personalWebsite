import { useState } from "react";
import LoginBtns from "../buttons/LoginBtns";
import Footer from "../Footer";
import PopupWindow from "../windows/PopupWindow";
import {DUMMY_TEXT} from "../../constants/constants";
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
            <p className="landing-body">{DUMMY_TEXT}</p>
            <PopupWindow windowToDisplay={windowToDisplay} displayRecoveryWindow={displayRecoveryWindow} closeWindow={closeWindow}/>
            <Footer/>
        </div>
    );
    
        
};

export default LandingPage;