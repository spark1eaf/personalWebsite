import axios from "axios";
import * as Constants from "../constants/constants"

const handleError = (error:unknown): ResponseObj<any> =>{
    if (axios.isAxiosError(error)) {
        console.error(`Error: ${error.message}`, error);
        return {
            status: error.response?.status,
            error: error.response?.data?.message || "An error has occurred, please try again."
        };
    }
    else {
        const errorMessage = error instanceof Error ? error.message: "Unexpected Error";
        console.error(`Unexpected error: ${errorMessage}`);
        return {error: "An unexpected error occurred. Please try again later." };
    }
}

//sends a login request and retrieves an auth token apon successful login
const login = async(loginObj:LoginData): Promise<ResponseObj<any>> =>{
    const url = Constants.LOGIN;
    try {
        const response = await axios.post(url, loginObj);
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error);
    }
};

//sends a logout request
const signout = async(token:string): Promise<ResponseObj<any>> =>{
    const url = Constants.SIGNOUT;
    try {
        const response = await axios.post(url,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error);
    }
};

//Sends a registration request for a new user
const register = async(newUser:UserRegObj): Promise<ResponseObj<any>> =>{
    const url = Constants.REGISTER;
    try {
        const response = await axios.post(url, newUser);    
        return{status:response.status, data: response.data}
    } catch (error) {
        return handleError(error);
    }
};

//sends a request to change a users password
const changePassword = async(email:string) =>{
    const url = Constants.CHANGEPASS;
    try {
        const response = await axios.put(`${url}?email=${encodeURIComponent(email)}`);
        //todo move logic into calling method after its created
        if(response.status === 200)
            alert("Password has been successfully updated")
    } catch (error) {
        return handleError(error);
    }
};

//Sends a request triggering an emauil with recovery link to be sent to the user
const requestRecoveryEmail = async (email:string) =>{
    const url = Constants.RECOVER;
    //not sure type of request needed atm.
};

//sends a request to retrieve userdetails
const getUserDetails = async(username:string): Promise<ResponseObj<any>> =>{
    const url = Constants.GET_USER_DETAILS;
    try {
        const response = await axios.get(`${url}?username=${encodeURIComponent(username)}`);
        return {status:response.status, data:response.data};
    } 
    catch (error) {
        return handleError(error);
    }
};

export default {login, signout, register, changePassword, requestRecoveryEmail, getUserDetails};