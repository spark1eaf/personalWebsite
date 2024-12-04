import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";
import axios from "axios";
import * as Constants from "../../constants/constants"

const RegistrationForm = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFirstNameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setLastName(event.target.value);
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

    const handleZipcodeChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setZipCode(event.target.value);
    };

    const sendRegistrationData = async(event:FormEvent) =>{
        event.preventDefault();
        //new user
        const user:UserRegObj = {
            username: userName,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            zipcode: zipcode
        };
        
        try {
            const response = await userManagement.register(user);
            if(response.status === 200){
                console.log(response.data);
                alert(Constants.REGISTRATION_SUCCESSFUL);
                location.reload();
            }
            else{
                alert(response.error || Constants.UNEXPECTED_ERROR_MSG);
            }
        } catch (error){
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    };

    return(
        <form className="registration-form" onSubmit={sendRegistrationData}>
            <input type="email" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
            <input type="text" onChange={handleFirstNameChange} placeholder="First Name" name="firstName" value={firstName} required/>
            <input type="text" onChange={handleLastNameChange} placeholder="Last Name" name="lastName" value={lastName} required/>
            <input type="text" onChange={handleZipcodeChange} placeholder="Zipcode" name="zipcode" value={zipcode} required/>
            <input type="text" onChange={handleUsernameChange} placeholder="Username" name="username" value={userName} required/>
            <input type="password" onChange={handlePasswordChange} placeholder="Enter a Password" name="password" value={password} required/>
            <input type="password" onChange={handleConfirmPassword} placeholder="Confirm Password" name="passwordConfirmation" value={confirmPassword} required/>
            <button type="submit" className="registration-submit-btn">Sign Up</button>
        </form> 
    );
};

export default RegistrationForm;