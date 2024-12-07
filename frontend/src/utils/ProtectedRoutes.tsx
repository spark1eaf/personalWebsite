import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () =>{
    return sessionStorage.getItem("loggedIn") ? <Outlet/> : <Navigate to={"/site"}/>
}

export default ProtectedRoutes;