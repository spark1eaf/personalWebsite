import { MouseEventHandler } from "react";
import WindowCloseBtn from "../buttons/WindowCloseBtn";
import RecoveryForm from "../forms/RecoveryForm";
import { RECOVERY_TEXT } from "../../constants/constants";
const PasswordRecoverWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <h1 className="recovery-title">Reset Password</h1>
                <p className="recovery-text">{RECOVERY_TEXT}</p>
                <RecoveryForm />
            </>
    );
};

export default PasswordRecoverWindow;