import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import userManagement from "../../service/userManagement";
import axios from "axios";
import * as Constants from "../../constants/constants"
import FormValidation from "../../utils/FormValidation";

const RegistrationForm = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [errors, setErrors] = useState<RegFormErrors>({});

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const handleFirstNameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setFirstName(event.target.value);
    };
    
    const handleLastNameChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setLastName(event.target.value);
    };

    const handleZipcodeChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setZipCode(event.target.value);
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

    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors,emailErr: FormValidation.checkEmail(email),}));
      }, [email]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors, firstNameErr: FormValidation.checkName(firstName),}));
      }, [firstName]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors, lastNameErr: FormValidation.checkName(lastName),}));
      }, [lastName]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors, zipcodeErr: FormValidation.checkZip(zipcode),}));
      }, [zipcode]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors, usernameErr: FormValidation.checkUsername(userName),}));
      }, [userName]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors,passwordErr: FormValidation.checkPass(password),}));
      }, [password]);
    
    useEffect(() => {
        setErrors((prevErrors) => ({...prevErrors, confirmPassErr: FormValidation.checkPassMatch(password, confirmPassword),}));
      }, [confirmPassword, password]);

    const validateForm = () =>{
        const errors:RegFormErrors = {};
        errors.emailErr = FormValidation.checkEmail(email);
        errors.firstNameErr = FormValidation.checkName(firstName);
        errors.lastNameErr = FormValidation.checkName(lastName);
        errors.zipcodeErr = FormValidation.checkZip(zipcode);
        errors.usernameErr = FormValidation.checkUsername(userName);
        errors.passwordErr = FormValidation.checkPass(password);
        if(confirmPassword !== password)
            errors.confirmPassErr = "Password does not match.";
        setErrors(errors);
    }

    const sendRegistrationData = async(event:FormEvent) =>{
        event.preventDefault();
        validateForm();
        const isValid = !(errors == undefined); 
        console.log("got it???  " + isValid)
        if(isValid){
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
                else
                    alert(response.error || Constants.UNEXPECTED_ERROR_MSG);
            } catch (error){
                if(axios.isAxiosError(error))
                    alert(error.response?.data.message);
                else
                    alert(Constants.UNEXPECTED_ERROR_MSG);     
            }
        }
    };

    return(
        <form className="registration-form" onSubmit={sendRegistrationData}>
            <div className="form-input">
                <input type="text" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
                {errors.emailErr && <p className="registration-error">{errors.emailErr}</p>}   
            </div>
            <div className="form-input">
                <input type="text" onChange={handleFirstNameChange} placeholder="First name" name="firstName" value={firstName} required/>
                {errors.firstNameErr && <p className="registration-error">{errors.firstNameErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleLastNameChange} placeholder="Last name" name="lastName" value={lastName} required/>
                {errors.lastNameErr && <p className="registration-error">{errors.lastNameErr}</p>}        
            </div>
            <div className="form-input">
                <input type="text" onChange={handleZipcodeChange} placeholder="Zipcode" name="zipcode" value={zipcode} required/>
                {errors.zipcodeErr && <p className="registration-error">{errors.zipcodeErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleUsernameChange} placeholder="Username" name="username" value={userName} required/>
                {errors.usernameErr && <p className="registration-error">{errors.usernameErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handlePasswordChange} placeholder="Enter a Password" name="password" value={password} required/>
                {errors.passwordErr && <p className="registration-error">{errors.passwordErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handleConfirmPassword} placeholder="Confirm Password" name="passwordConfirmation" value={confirmPassword} required/>
                {errors.confirmPassErr && <p className="registration-error">{errors.confirmPassErr}</p>}
            </div>
            <button type="submit" className="registration-submit-btn">Sign Up</button>
        </form> 
    );
};

export default RegistrationForm;