import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";
import * as Constants from "../../constants/constants"

const RecoveryForm = () =>{
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const requestRecovery = (event:FormEvent) =>{
        setSubmitting(true)
        event.preventDefault();
        userManagement.requestRecoveryEmail(email);
        console.log(Constants.RECOVERY_EMAIL_SENT);
        setSubmitting(false);
    };

    return(
        <form className="recovery-form" onSubmit={requestRecovery}>
            <input type="email" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
            <button type="submit" disabled={submitting} className="recovery-submit-btn">Submit</button>
        </form>
    );
};

export default RecoveryForm;