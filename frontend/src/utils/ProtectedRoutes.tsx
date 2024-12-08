import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () =>{
    return sessionStorage.getItem("loggedIn") ? <Outlet/> : <Navigate to={""}/>
}

export default ProtectedRoutes;