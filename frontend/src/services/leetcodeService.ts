import axios from "axios";
import handleError from "../utils/ErrorHandler";
import * as Constants from "../constants/constants"

const getlinkData = async() =>{
    try {
        const response = await axios.get(Constants.LEETCODE_FILENAME, { responseType: 'text' })
        return response;
    } 
    catch (error) {
        return handleError(error, Constants.ERROR_RETRIEVING_LINKS);
    }
}

export default {getlinkData};