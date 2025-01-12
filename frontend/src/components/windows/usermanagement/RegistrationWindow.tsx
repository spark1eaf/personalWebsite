import { MouseEventHandler } from "react";
import WindowCloseBtn from "../../buttons/windowclose/WindowCloseBtn";
import RegistrationForm from "../../forms/usermanagement/registration/RegistrationForm";

const RegistrationWindow = ({closeWindow}: {closeWindow:MouseEventHandler<HTMLButtonElement>}) =>{
    return(
            <>
                <WindowCloseBtn closeWindow={closeWindow}/>
                <h1 className="title">Register</h1>
                <RegistrationForm/>
            </>
    );
};

export default RegistrationWindow;