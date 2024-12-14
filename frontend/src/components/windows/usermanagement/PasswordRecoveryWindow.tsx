import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/WindowCloseBtn";
import { RECOVERY_TEXT } from "../../../constants/constants";
import RecoveryForm from "../../forms/usermanagement/RecoveryForm";

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