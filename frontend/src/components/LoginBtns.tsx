import { MouseEventHandler } from "react";

interface ClickEvents{
    displayLoginWindow:MouseEventHandler<HTMLButtonElement>;
    displayRegistrationWindow:MouseEventHandler<HTMLButtonElement>;
}

const LoginBtns = ({displayLoginWindow: handleLogin, displayRegistrationWindow: handleRegistration}:ClickEvents) =>{

    return(
        <div className="login-btns">
            <button onClick={handleLogin}>Log in</button>
            <button onClick={handleRegistration}>Sign up</button>
        </div>
    );

}

export default LoginBtns;