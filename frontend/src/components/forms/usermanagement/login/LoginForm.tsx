import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import { useNavigate } from 'react-router-dom';
import userManagementService from "../../../../services/userManagementService";
import * as Constants from "../../../../constants/constants"
import "./loginform.css"

const LoginForm = ({displayRecoveryWindow}: {displayRecoveryWindow?: MouseEventHandler<HTMLButtonElement>}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigator = useNavigate();

    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
          }
    };

    const sendLoginData = async (event:FormEvent) =>{
        setSubmitting(true);
        const user:LoginData = {
            username: username,
            password: password
        };
        event.preventDefault();
        const response = await userManagementService.login(user);
        if(response.status === 200){
            sessionStorage.setItem(Constants.SESSION_LOGIN_STATUS, "true")
            sessionStorage.setItem(Constants.SESSION_USERNAME, username);
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
        <form className="login-form" onSubmit={sendLoginData}>
            <input type="text" onChange={handleChange} placeholder="Username" name="username" value={username} required />
            <button className="forgot-pass-btn" type="button" onClick={displayRecoveryWindow}>Forgot Password?</button>
            <input type="password" onChange={handleChange} placeholder="Password" name="password" value={password} required />
                <button type="submit" disabled={submitting} className="submit-btn">Log in</button>
        </form>
    );
};

export default LoginForm;