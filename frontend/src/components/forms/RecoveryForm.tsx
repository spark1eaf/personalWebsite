import { ChangeEvent, FormEvent, useState } from "react";
import userManagement from "../../service/userManagement";
import * as Constants from "../../constants/constants"

const RecoveryForm = () =>{
    const [email, setEmail] = useState("");

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const requestRecovery = (event:FormEvent) =>{
        event.preventDefault();
        userManagement.requestRecoveryEmail(email);
        console.log(Constants.RECOVERY_EMAIL_SENT);
    };

    return(
        <form className="recovery-form" onSubmit={requestRecovery}>
            <input type="email" onChange={handleEmailChange} placeholder="Email" name="email" value={email} required/>
            <button type="submit" className="recovery-submit-btn">Submit</button>
        </form>
    );
};

export default RecoveryForm;