import { ChangeEvent, FormEvent, useState } from "react";

const RecoveryForm = () =>{
    const [email, setEmail] = useState("");

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    };

    const sendRecoveryEmail = (event:FormEvent) =>{
        event.preventDefault();
        console.log("Recovery email sent.");
    };

    return(
        <form className="recovery-form" onSubmit={sendRecoveryEmail}>
            <input type="email" onChange={handleEmailChange} placeholder="email" name="email" value={email} required/>
            <button type="submit" className="recovery-submit-btn">Submit</button>
        </form>
    );
};

export default RecoveryForm;