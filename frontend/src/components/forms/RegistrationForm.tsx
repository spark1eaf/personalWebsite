import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";

const RegistrationForm = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value);
    };

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event:ChangeEvent<HTMLInputElement>) =>{
        setConfirmPassword(event.target.value);
    };

    const sendRegistrationData = (event:FormEvent) =>{
        event.preventDefault();
        //new user
        const user:UserObj = {
            username: userName,
            email: email,
            password: password
        };
        userManagement.register(user);
    };

    return(
        <form className="registration-form" onSubmit={sendRegistrationData}>
            <input type="text" onChange={handleNameChange} placeholder="Name" name="name" value={name} required/>
            <input type="email" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
            <input type="text" onChange={handleUsernameChange} placeholder="Username" name="username" value={userName} required/>
            <input type="password" onChange={handlePasswordChange} placeholder="Enter a Password" name="password" value={password} required/>
            <input type="password" onChange={handleConfirmPassword} placeholder="Confirm Password" name="passwordConfirmation" value={confirmPassword} required/>
            <button type="submit" className="registration-submit-btn">Sign Up</button>
        </form> 
    );
};

export default RegistrationForm;