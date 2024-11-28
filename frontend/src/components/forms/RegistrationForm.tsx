import { ChangeEvent, FormEvent, useState } from "react";

const RegistrationForm = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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

    const sendRegistrationData = (event:FormEvent) =>{
        event.preventDefault();
    };

    return(
        <form className="registration-form" onSubmit={sendRegistrationData}>
            <input type="text" onChange={handleNameChange} placeholder="Your Name" name="Name" value={name} required/>
            <input type="text" onChange={handleEmailChange} placeholder="Your Email" name="Email" value={email} required/>
            <input type="email" onChange={handleUsernameChange} placeholder="Your Username" name="Username" value={userName} required/>
            <input type="password" onChange={handlePasswordChange} placeholder="Enter a Password" name="assword" value={password} required/>
            <input type="password" onChange={handlePasswordChange} placeholder="Confirm Password" name="Password Confirmation" value={password} required/>
            <button type="submit" className="registration-submit-btn">Sign up</button>
        </form> 
    );
};

export default RegistrationForm;