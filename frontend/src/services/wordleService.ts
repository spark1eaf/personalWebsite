import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL;

//sends wordle attempt to backend
const sendWordleAttempt = async(username:string, word:string, attemptNum:number): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.WORDLE_ATTEMPT}${Constants.USERNAME_PARAM}${username}${Constants.WORD_PARAM}${word}${Constants.ATTEMPT_NUM_PARAM}${attemptNum}`;
    try {
        const response = await axios.post(url, {}, {withCredentials: true});
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
};

//sends request to retrieve today's wordle word
const retrieveTodaysWord = async(username:string): Promise<ResponseObj<any>> =>{
    const url = `${API_URL}${Constants.GET_DAILY_WORD}${Constants.USERNAME_PARAM}${username}`;
    try {
        const response = await axios.get(url, {withCredentials: true});
        return{status:response.status, data:response.data}
    } catch (error) {
        return handleError(error, Constants.UNEXPECTED_ERROR);
    }
}

export default {sendWordleAttempt, retrieveTodaysWord};