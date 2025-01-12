import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/windowclose/WindowCloseBtn";
import RecoveryForm from "../../forms/usermanagement/recovery/RecoveryForm";

const PasswordRecoverWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <h1 className="title pass-rec-title">Reset Password</h1>
                <RecoveryForm />
            </>
    );
};

export default PasswordRecoverWindow;