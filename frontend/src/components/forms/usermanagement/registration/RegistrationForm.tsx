import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as Constants from "../../../../constants/constants"
import FormValidation from "../../../../utils/FormValidation";
import userManagementService from "../../../../services/userManagementService";
import "./registrationform.css"

interface RegFormErrors{
    emailErr?: string|null,
    firstNameErr?: string|null,
    lastNameErr?: string|null,
    usernameErr?: string|null,
    zipcodeErr?: string|null,
    passwordErr?: string|null,
    confirmPassErr?: string|null
};

const RegistrationForm = () =>{
    const [formFields, setFormFields] = useState<UserRegObj>({firstName:"", lastName:"", username:"", password:"", confirmPass:"", email:"", zipcode:""});
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<RegFormErrors>({});

    //validates form fields returning an object containing all errors
    const validateFormFields = () =>{
        const errors:RegFormErrors = {};
        errors.emailErr = FormValidation.checkEmail(formFields.email);
        errors.firstNameErr = FormValidation.checkName(formFields.firstName);
        errors.lastNameErr = FormValidation.checkName(formFields.lastName);
        errors.zipcodeErr = FormValidation.checkZip(formFields.zipcode);
        errors.usernameErr = FormValidation.checkUsername(formFields.username);
        errors.passwordErr = FormValidation.checkPass(formFields.password);
        errors.confirmPassErr = FormValidation.checkPassMatch(formFields.password, formFields.confirmPass);
        return errors;
    }
    
    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        let currentFields = {...formFields};
        switch (event.target.name) {
            case "firstName":
                currentFields.firstName = event.target.value
                break;
            case "lastName":
                currentFields.lastName = event.target.value
                break;
            case "email":
                currentFields.email = event.target.value
                break;
            case "zipcode":
                currentFields.zipcode = event.target.value
                break
            case "username":
                currentFields.username = event.target.value
                break;
            case "password":
                currentFields.password = event.target.value
                break;
            case "confirmPassword":
                currentFields.confirmPass = event.target.value
                break;
          }
          setFormFields(currentFields);
    };
    //throttle error validation so user wont see errors while typing
    useEffect(() => {
        const timer = setTimeout(() => {
            const newErrors = validateFormFields();
            setErrors(newErrors);
        }, 300);
    
        return () => clearTimeout(timer);
    }, [formFields]);

    const sendRegistrationData = async(event:FormEvent) =>{
        event.preventDefault();
        setSubmitting(true);
        const errors = validateFormFields();
        const isValid = Object.values(errors).every(element => element === "" || element === undefined);
        if(isValid){
            const response = await userManagementService.register(formFields);
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
                <input type="text" onChange={handleChange} placeholder="Email" name="email" value={formFields.email} required/>
                {errors.emailErr && <p className="registration-error">{errors.emailErr}</p>}   
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="First name" name="firstName" value={formFields.firstName} required/>
                {errors.firstNameErr && <p className="registration-error">{errors.firstNameErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Last name" name="lastName" value={formFields.lastName} required/>
                {errors.lastNameErr && <p className="registration-error">{errors.lastNameErr}</p>}        
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Zipcode" name="zipcode" value={formFields.zipcode} required/>
                {errors.zipcodeErr && <p className="registration-error">{errors.zipcodeErr}</p>}
            </div>
            <div className="form-input">
                <input type="text" onChange={handleChange} placeholder="Username" name="username" value={formFields.username} required/>
                {errors.usernameErr && <p className="registration-error">{errors.usernameErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handleChange} placeholder="Enter a Password" name="password" value={formFields.password} required/>
                {errors.passwordErr && <p className="registration-error">{errors.passwordErr}</p>}
            </div>
            <div className="form-input">
                <input type="password" onChange={handleChange} placeholder="Confirm Password" name="confirmPassword" value={formFields.confirmPass} required/>
                {errors.confirmPassErr && <p className="registration-error">{errors.confirmPassErr}</p>}
            </div>
            <button type="submit" disabled={submitting} className="registration-btn">Sign Up</button>
        </form> 
    );
};

export default RegistrationForm;