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
            const response = await userManagement.getUserDetails(localStorage.getItem("username") ||"");
            if(response.status === 200){

            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message)
            else
                alert("An unexpected error occurred. Please try again later.");     
        }
    }
    
    //Sends request for backend to blacklist auth token and removes it from local storage.
    const handleSignOut = async () =>{
        try {
            const response = await userManagement.signout(localStorage.getItem("authentication")|| "");
            if(response.status === 200){
                localStorage.removeItem("authentication");
                alert("You've been signed out successfully");
                navigator(Constants.LANDING_PAGE);
            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message)
            else
                alert("An unexpected error occurred. Please try again later.");     
        }
    }
    //send out request to retrieve user details
    populateUserDetails()

    return(
        <div className="home-page">
            <button onClick={handleSignOut} className="logout-btn"> Sign out</button>
            <h1 className="title">Welcome</h1>
            <Footer/>
        </div>
    )
}

export default HomePage;