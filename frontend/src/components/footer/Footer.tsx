import * as Constants from "../../constants/constants";
import "./footer.css"

const Footer = () =>{
    return(
        <footer className="footer">
            <p>{Constants.FOOTER_P1}</p>
            <p>{Constants.FOOTER_P2}</p>
        </footer>
    );
};

export default Footer;