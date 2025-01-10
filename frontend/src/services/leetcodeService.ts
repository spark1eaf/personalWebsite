import axios from "axios";
import handleError from "../utils/ErrorHandler";
import * as Constants from "../constants/constants"

const getlinkData = async() =>{
    const path = import.meta.env.VITE_LEETCODE_FILEPATH;
    try {
        const response = await axios.get(path, { responseType: 'text' })
        return response;
    } 
    catch (error) {
        return handleError(error, Constants.ERROR_RETRIEVING_LINKS);
    }
}

export default {getlinkData};