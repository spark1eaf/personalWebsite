import "../../styles/homepage.css"
import Footer from "../Footer";
import userManagement from "../../service/userManagement";
import * as Constants from "../../constants/constants"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const HomePage = () =>{
    
    const navigator = useNavigate();
    const populateUserDetails = async () =>{
        try {
            const response = await userManagement.getUserDetails(localStorage.getItem("username") ||"", localStorage.getItem("authentication") || "");
            if(response.status === 200){
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("zipcode", response.data.zipcode)
            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    }
    
    //Sends request for backend to blacklist auth token and removes it from local storage.
    const handleSignOut = async () =>{
        try {
            const response = await userManagement.signout(localStorage.getItem("authentication")|| "");
            if(response.status === 200 || response.status === 503){
                localStorage.removeItem("authentication");
                navigator(Constants.LANDING_PAGE);
                alert(Constants.SIGNOUT_SUCCESSFUL);
            }

        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message)
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    }
    //send out request to retrieve user details
    populateUserDetails()

    return(
        <div className="home-page">
            <button onClick={handleSignOut} className="logout-btn"> Sign out</button>
            <h1 className="title">{`Welcome ${localStorage.getItem("firstName")}!`}</h1>
            <Footer/>
        </div>
    )
};

export default HomePage;