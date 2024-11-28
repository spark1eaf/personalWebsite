import { ChangeEvent, FormEvent, useState } from "react";

const LoginForm = () =>{
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    };

    const sendLoginnData = (event:FormEvent) =>{
        event.preventDefault();
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