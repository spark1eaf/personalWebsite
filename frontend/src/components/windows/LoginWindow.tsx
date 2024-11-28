import { MouseEventHandler } from "react";
import WindowCloseBtn from "../buttons/WindowCloseBtn";
import LoginForm from "../forms/LoginForm";

interface Props{
    displayRecoveryWindow:MouseEventHandler<HTMLButtonElement>,
    closeWindow:MouseEventHandler<HTMLButtonElement>
};

const LoginWindow = ({displayRecoveryWindow, closeWindow}:Props)=>{

    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow}/>
                <h1 className="login-title">Login</h1>
                <LoginForm />
                <button className="forgot-pass-btn" onClick={displayRecoveryWindow}>Forgot Password?</button>
            </>
    );
};

export default LoginWindow;