import "../../styles/homepage.css"
import Footer from "../Footer";
import userManagement from "../../service/userManagement";
import * as Constants from "../../constants/constants"
import { useNavigate } from 'react-router-dom';


const HomePage = () =>{
    const navigator = useNavigate();


    const handleSignOut = async () =>{
        //blacklists auth token
        try {
            const response = await userManagement.signout(localStorage.getItem("authentication")|| "");
            if(response.status === 200){
                localStorage.removeItem("authentication");
                alert("You've been signed out successfully");
                navigator(Constants.HOME_PAGE);
            }
        } catch (error) {
            
        }
    }

    return(
        <div className="home-page">
            <button onClick={handleSignOut} className="logout-btn"> Sign out</button>
            <h1 className="title">Home</h1>
            <Footer/>
        </div>
    )
}

export default HomePage;