import { MouseEventHandler } from "react";

interface ClickEvents{
    displayLoginWindow:MouseEventHandler<HTMLButtonElement>
    displayRegistrationWindow:MouseEventHandler<HTMLButtonElement>
};

const LoginBtns = ({displayLoginWindow, displayRegistrationWindow}:ClickEvents) =>{

    return(
        <div className="login-btns">
            <button onClick={displayLoginWindow}>Log in</button>
            <button onClick={displayRegistrationWindow}>Sign up</button>
        </div>
    );
};

export default LoginBtns;