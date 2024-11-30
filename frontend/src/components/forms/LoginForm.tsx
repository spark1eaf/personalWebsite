import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";
import { useNavigate } from 'react-router-dom';

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

    const sendLoginnData = (event:FormEvent) =>{
        const user:LoginData = {
            username: username,
            password: password
        };
        event.preventDefault();
        userManagement.login(user)
            .then(response =>{
                navigator("/home", {state:response});  
            })
            .catch(error=>
                console.log(`Error logging in: ${error.message}`));
    };
    return(
        <form className="logon-form" onSubmit={sendLoginnData}>
            <input type="text" onChange={handleUsernameChange} placeholder="Username" name="username" value={username} required />
            <input type="password" onChange={handlePasswordChange} placeholder="Password" name="password" value={password} required />
            <button type="submit" className="login-submit-btn">Log in</button>
        </form>
    );
};

export default LoginForm;