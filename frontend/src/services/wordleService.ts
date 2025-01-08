import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL;

//sends wordle attempt to backend
const sendWordleAttempt = async(username:string, word:string, attemptNum:number): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.WORDLE_ATTEMPT}?username=${username}&word=${word}&attemptNum=${attemptNum}`;
    try {
        const response = await axios.post(url, {}, {withCredentials: true});
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

export default {sendWordleAttempt};