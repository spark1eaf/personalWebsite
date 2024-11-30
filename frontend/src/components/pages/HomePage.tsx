import { useLocation } from "react-router-dom";

const HomePage = () =>{
    const authToken = useLocation().state.token;
    console.log(authToken);
    return(
        <h1>Home</h1>
    )
}

export default HomePage;