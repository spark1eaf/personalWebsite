import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL;

//sends a login request and retrieves an auth token apon successful login
const login = async(loginObj:LoginData): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.LOGIN}`;
    try {
        const response = await axios.post(url, loginObj, {withCredentials: true});
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

//sends a logout request
const signout = async(): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.SIGNOUT}`;
    try {
        const response = await axios.post(url,{},{withCredentials: true});
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

//Sends a registration request for a new user
const register = async(newUser:UserRegObj): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.REGISTER}`;
    try {
        const response = await axios.post(url, newUser);    
        return{status:response.status, data: response.data}
    } catch (error) {
        return handleError(error,Constants.UNEXPECTED_ERROR);
    }
};

//sends a request to change a users password
const changePassword = async(email:string) =>{
    const url = `${API_URL}${Constants.CHANGEPASS}${encodeURIComponent(email)}`;
    try {
        const response = await axios.put(url,{},{withCredentials: true});
        //todo move logic into calling method after its created
        if(response.status === 200)
            alert(Constants.PASSWORD_UPDATED)
    } catch (error) {
        return handleError(error,Constants.UNEXPECTED_ERROR);
    }
};

//Sends a request triggering an emauil with recovery link to be sent to the user
const requestRecoveryEmail = async (email:string) =>{
    const url = `${API_URL}${Constants.RECOVERY}`;
    //not implemented at the moment.
};

//sends a request to retrieve userdetails
const getUserDetails = async(username:string): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.GET_USER_DETAILS}${Constants.USERNAME_PARAM}${encodeURIComponent(username)}`;
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        })
        return {status:response.status, data:response.data};
    } 
    catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

//sends request to query if user is already logged in
const getLoginStatus = async(username:string): Promise<ResponseObj<any>> =>{
        
    const url = `${API_URL}${Constants.GET_LOGIN_STATUS}${Constants.USERNAME_PARAM}${encodeURIComponent(username)}`
    try {
        const response = await axios.post(url, {}, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        })
        return {status:response.status, data:response.data};
    } 
    catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

export default {login, signout, register, changePassword, requestRecoveryEmail, getUserDetails, getLoginStatus};