import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

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
        return handleError(error, `Error retrieving coordinates`);
    }
};

//gets the timezone based on the provided coordinates
const getTimezone = async(latitude:string, longitude:string) =>{
    const url = `http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=${Constants.GENOMES_KEY}`;
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        return handleError(error, `Error retrieving timezone`);
    }
};

export default {getCoordinates, getTimezone};