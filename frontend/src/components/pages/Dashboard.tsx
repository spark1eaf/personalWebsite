import "../../styles/homepage.css"
import Footer from "../Footer";
import userManagement from "../../service/userManagement";
import * as Constants from "../../constants/constants"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () =>{
    const [name, setName] = useState("");
    const navigator = useNavigate();
    const [submitting, setSubmitting] = useState(false);    
    
    //send out request to retrieve user details
    const populateUserDetails = async () =>{
        try {
            const response = await userManagement.getUserDetails(sessionStorage.getItem(Constants.SESSION_USER) ||"");
            if(response.status === 200){
                setName(response.data.firstName);
            }
        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message);
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }
    }

    useEffect(() =>{populateUserDetails();}, []);

    //Sends request to blacklist auth token and adjusts session storage for route guarding.
    const handleSignOut = async () =>{
        setSubmitting(true);
        
        try {
            const response = await userManagement.signout();
            if(response.status === 200 || response.status === 503){
                navigator("/");
                alert(Constants.SIGNOUT_SUCCESSFUL);
                sessionStorage.removeItem(Constants.LOGIN_STATUS);
            }

        } catch (error) {
            if(axios.isAxiosError(error))
                alert(error.response?.data.message)
            else
                alert(Constants.UNEXPECTED_ERROR_MSG);     
        }

        setSubmitting(false);
    }

    return(
        <div className="home-page">
            <button disabled={submitting} onClick={handleSignOut} className="logout-btn"> Sign out</button>
            <h1 className="title">{`Welcome ${name}!`}</h1>
            <Footer/>
        </div>
    )
};

export default Dashboard;