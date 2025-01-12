import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/windowclose/WindowCloseBtn";
import { RECOVERY_TEXT } from "../../../constants/constants";
import RecoveryForm from "../../forms/usermanagement/recovery/RecoveryForm";
import "./passwordrecoverywindow.css"

const PasswordRecoverWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <h1 className="title">Reset Password</h1>
                <p className="recovery-text">{RECOVERY_TEXT}</p>
                <RecoveryForm />
            </>
    );
};

export default PasswordRecoverWindow;