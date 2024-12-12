import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import userManagement from "../../service/userManagement";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Constants from "../../constants/constants"

const LoginForm = ({displayRecoveryWindow}: {displayRecoveryWindow: MouseEventHandler<HTMLButtonElement>}) =>{
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
        try {
            const response = await userManagement.login(user);
            if(response.status === 200){
                sessionStorage.setItem(Constants.LOGIN_STATUS, "true")
                sessionStorage.setItem(Constants.SESSION_USER, username);
                navigator(Constants.DASHBOARD);
            }
            else if(response.status === 403){
                alert(Constants.INCORRECT_CREDENTIALS)
            }
            else
                alert(response.error || Constants.UNEXPECTED_ERROR_MSG);
        } catch (error){
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
        setSubmitting(false);
    };
    return(
        <form className="logon-form" onSubmit={sendLoginData}>
            <input type="text" onChange={handleChange} placeholder="Username" name="username" value={username} required />
            <button className="forgot-pass-btn" onClick={displayRecoveryWindow}>Forgot Password?</button>
            <input type="password" onChange={handleChange} placeholder="Password" name="password" value={password} required />
            <button type="submit" disabled={submitting} className="login-submit-btn">Log in</button>
        </form>
    );
};

export default LoginForm;