import axios from "axios";
import * as Constants from "../constants/constants"



const login = async(loginObj:LoginData): Promise<ResponseObj<any>> =>{
    const url = Constants.LOGIN;
    try {
        const response = await axios.post(url, loginObj);
        return{status:response.status, data:response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error: ${error.message}`, error);
            return {
                error: error.response?.data?.message || "An error has occurred, please try again.",
                status: error.status
            };
        }
        else {
            console.error(`Unexpected error: ${(error as Error).message}`, error);
            return {error: "An unexpected error occurred. Please try again later." };
        }
    }
};

const signout = async(token:string): Promise<ResponseObj<any>> =>{
    const url = Constants.SIGNOUT;
    try {
        const response = await axios.post(url, token,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
        return{status:response.status, data:response.data}
    } 
    catch (error) {
        console.error(`Unexpected error: ${(error as Error).message}`, error);
        return {error: "An unexpected error occurred. Please try again later." };
    }
};

const register = async(newUser:UserObj) =>{
    const url = Constants.REGISTER;
    try {
        const response = await axios.post(url, newUser);
        if(response.status === 200){
            console.log(response.data)
            alert("Registration Successful!");
            window.location.reload();
        }     
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error(`Error: ${error.message}`, error);
            alert(`${error.response?.data || "An unexpected error occurred."} Please try again.`);
        }
        else {
            console.error(`Unexpected error: ${(error as Error).message}`, error);
            alert("An unexpected error occurred. Please try again.");
        }
    }
};


const changePassowrd = () =>{
    const url = Constants.CHANGEPASS;
    return axios.put(url)
        .then(response=>response.data);
};

const requestRecoveryEmail = (email:string) =>{
    const url = Constants.RECOVER;
    //not sure type of request needed atm.
};



export default {login, signout, register, changePassowrd, requestRecoveryEmail};