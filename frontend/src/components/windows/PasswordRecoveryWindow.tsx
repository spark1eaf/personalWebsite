import { MouseEventHandler } from "react";
import WindowCloseBtn from "../buttons/WindowCloseBtn";
import RecoveryForm from "../forms/RecoveryForm";

const PasswordRecoverWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <h1 className="recovery-title">Reset Password</h1>
                <p className="recovery-text">Please provide the email address linked to your account below and you will recieve a recovery email shortly.</p>
                <RecoveryForm />
            </>
    );
};

export default PasswordRecoverWindow;