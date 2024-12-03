import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Constants from "../../constants/constants"

const LoginForm = () =>{
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    
    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    };

    const sendLoginData = async (event:FormEvent) =>{
        const user:LoginData = {
            username: username,
            password: password
        };
        event.preventDefault();
        try {
            const response = await userManagement.login(user);
            if(response.status === 200){
                localStorage.setItem("authentication", response.data.token);
                localStorage.setItem("username", username);
                navigator(Constants.HOME_PAGE);
            }
            else if(response.status === 404)
                alert(Constants.INCORRECT_CREDENTIALS);
        } catch (error){
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    };
    return(
        <form className="logon-form" onSubmit={sendLoginData}>
            <input type="text" onChange={handleUsernameChange} placeholder="Username" name="username" value={username} required />
            <input type="password" onChange={handlePasswordChange} placeholder="Password" name="password" value={password} required />
            <button type="submit" className="login-submit-btn">Log in</button>
        </form>
    );
};

export default LoginForm;