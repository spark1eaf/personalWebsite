import { MouseEventHandler, useState } from "react";
import userManagementService from "../../../services/userManagementService";
import * as Constants from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import "./loginbtns.css"

interface Props{
    displayLoginWindow:MouseEventHandler<HTMLButtonElement>
    displayRegistrationWindow:MouseEventHandler<HTMLButtonElement>
};

const LoginBtns = ({displayLoginWindow, displayRegistrationWindow}:Props) =>{
    const [submitting, setSubmitting] = useState(false);
    const navigator = useNavigate();

    //log in with guest account
    const initiateGuestLogin = async () =>{
        setSubmitting(true);

        const user:LoginData = {
            username: "guest",
            password: import.meta.env.VITE_GUEST_PASSWORD
        };

        const response = await userManagementService.login(user);

        if(response.status === 200){
            sessionStorage.setItem(Constants.SESSION_LOGIN_STATUS, "true")
            sessionStorage.setItem(Constants.SESSION_USERNAME, "guest");
            navigator(Constants.DASHBOARD);
        }
        else if(response.status === 403){
            alert(Constants.INCORRECT_CREDENTIALS)
        }
        else
            alert(response.error || Constants.UNEXPECTED_ERROR_MSG);
        setSubmitting(false);
    };

    return(
        <div className="login-btns">
            <button disabled={submitting} onClick={initiateGuestLogin}>Guest Log in</button>
            <button onClick={displayLoginWindow}>Log in</button>
            <button onClick={displayRegistrationWindow}>Sign up</button>
        </div>
    );
};

export default LoginBtns;