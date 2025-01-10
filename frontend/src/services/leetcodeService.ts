import axios from "axios";
import handleError from "../utils/ErrorHandler";
import * as Constants from "../constants/constants"

const getlinkData = async(attempts = 3,) =>{
    const delay = 1000;
    try {
        const response = await axios.get(Constants.LEETCODE_FILENAME, { responseType: 'text' })
        return response;
    } 
    catch (error) {
        if(attempts > 0){
            await new Promise((resolve) => setTimeout(resolve, delay));
            return getlinkData(attempts - 1);
        }
        else
           return handleError(error, Constants.ERROR_RETRIEVING_LINKS);
    }
}

export default {getlinkData};