import { ChangeEvent, FormEvent, useState } from "react";
import * as Constants from "../../../../constants/constants"
import userManagementService from "../../../../services/userManagementService";
import "./recoveryform.css"

const RecoveryForm = () =>{
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const requestRecovery = (event:FormEvent) =>{
        setSubmitting(true)
        event.preventDefault();
        userManagementService.requestRecoveryEmail(email);
        console.log(Constants.RECOVERY_EMAIL_SENT);
        setSubmitting(false);
    };

    return(
        <form className="recovery-form" onSubmit={requestRecovery}>
            <p className="recovery-text">{Constants.RECOVERY_TEXT}</p>
            <input type="email" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
            <button type="submit" disabled={submitting} className="submit-btn">Submit</button>
        </form>
    );
};

export default RecoveryForm;