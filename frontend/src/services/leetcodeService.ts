import axios from "axios";
import handleError from "../utils/ErrorHandler";
import * as Constants from "../constants/constants"

const getlinkData = async(attempts = 3,) =>{
    const timestamp = new Date().getTime();
    try {
        const response = await axios.get(Constants.LEETCODE_FILENAME?t=${timestamp}, { responseType: 'text' })
        return response;
    } 
    catch (error) {
        return handleError(error, Constants.ERROR_RETRIEVING_LINKS);
    }
}

export default {getlinkData};