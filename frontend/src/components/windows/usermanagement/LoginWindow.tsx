import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/windowclose/WindowCloseBtn";
import LoginForm from "../../forms/usermanagement/login/LoginForm";

interface Props{
    displayRecoveryWindow?:MouseEventHandler<HTMLButtonElement>,
    closeWindow:MouseEventHandler<HTMLButtonElement>
};

const LoginWindow = ({displayRecoveryWindow, closeWindow}:Props)=>{

    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow}/>
                <h1 className="title" >Login</h1>
                <LoginForm displayRecoveryWindow = {displayRecoveryWindow}/>
            </>
    );
};

export default LoginWindow;