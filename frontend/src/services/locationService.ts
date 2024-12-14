import axios from "axios";
import * as Constants from "../constants/constants"

//sends request retrieve coordinates for current location
const getCoordinates = async(zipcode?:string, city?:string, state?:string):Promise<ResponseObj<any>> =>{
    let url = "";
    if(zipcode)
        url = `${Constants.COORDINATES_URL}${zipcode}`;
    else
        url = `${Constants.COORDINATES_URL}${Constants.STATE_CODES.get(state||"")}/${city?.replace(/ /g, "%20")}`;
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error: ${error.message}`, error);
            const statusCode = error.code === "ERR_NETWORK" ? 503 : error.response?.status
            return {
                status: statusCode,
                error: error.response?.data || Constants.ERROR_TRY_AGAIN_MSG
            };
        }
        else{
            const errorMessage = error instanceof Error ? error.message: Constants.UNEXPECTED_ERROR;
            console.error(`Error retrieving coordinates: ${errorMessage}`)
            return {error: Constants.UNEXPECTED_ERROR_MSG };
        }
    }
};

export default {getCoordinates}