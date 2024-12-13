import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as Constants from "../../../constants/constants"
import FormValidation from "../../../utils/FormValidation";
import userManagement from "../../../services/userManagement";

const RegistrationForm = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<RegFormErrors>({});

    //validates form fields returning an object containing all errors
    const validateFormFields = () =>{
        const errors:RegFormErrors = {};
        errors.emailErr = FormValidation.checkEmail(email);
        errors.firstNameErr = FormValidation.checkName(firstName);
        errors.lastNameErr = FormValidation.checkName(lastName);
        errors.zipcodeErr = FormValidation.checkZip(zipcode);
        errors.usernameErr = FormValidation.checkUsername(username);
        errors.passwordErr = FormValidation.checkPass(password);
        errors.confirmPassErr = FormValidation.checkPassMatch(password, confirmPassword);
        return errors;
    }
    
    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "zipcode":
                setZipCode(event.target.value);
                break
            case "username":
                setUsername(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "confirmPassword":
                setConfirmPassword(event.target.value);
                break;
          }
    };
    //throttle error validation so user wont see errors while typing
    useEffect(() => {
        const timer = setTimeout(() => {
            const newErrors = validateFormFields();
            setErrors(newErrors);
        }, 300);
    
        return () => clearTimeout(timer);
    }, [email, firstName, lastName, zipcode, username, password, confirmPassword]);

    const sendRegistrationData = async(event:FormEvent) =>{
        event.preventDefault();
        setSubmitting(true);
        const errors = validateFormFields();
        const isValid = Object.values(errors).every(element => element === "" || element === undefined);
        if(isValid){
            //new user
            const user:UserRegObj = {
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                zipcode: zipcode
            };
            const response = await userManagement.register(user);
            if(response.status === 200){
                alert(Constants.REGISTRATION_SUCCESSFUL);
                location.reload();
            }
            else
                alert(response.error || Constants.UNEXPECTED_ERROR_MSG);
        }
        setSubmitting(false);
    };

    return(
        <form className="registration-form" onSubmit={sendRegistrationData}>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Email" name="email" value={email} required/>
                {errors.emailErr && <p className="registration-error">{errors.emailErr}</p>}   
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="First name" name="firstName" value={firstName} required/>
                {errors.firstNameErr && <p className="registration-error">{errors.firstNameErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Last name" name="lastName" value={lastName} required/>
                {errors.lastNameErr && <p className="registration-error">{errors.lastNameErr}</p>}        
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Zipcode" name="zipcode" value={zipcode} required/>
                {errors.zipcodeErr && <p className="registration-error">{errors.zipcodeErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Username" name="username" value={username} required/>
                {errors.usernameErr && <p className="registration-error">{errors.usernameErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handleChange} placeholder="Enter a Password" name="password" value={password} required/>
                {errors.passwordErr && <p className="registration-error">{errors.passwordErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handleChange} placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} required/>
                {errors.confirmPassErr && <p className="registration-error">{errors.confirmPassErr}</p>}
            </div>
            <button type="submit" disabled={submitting} className="submit-btn">Sign Up</button>
        </form> 
    );
};

export default RegistrationForm;