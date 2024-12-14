import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/WindowCloseBtn";
import RegistrationForm from "../../forms/usermanagement/RegistrationForm";
const RegistrationWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{

    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow}/>
                <h1 className="registration-title">Register</h1>
                <RegistrationForm/>
            </>
    );
};

export default RegistrationWindow;