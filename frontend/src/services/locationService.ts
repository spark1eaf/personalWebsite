import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

//sends request retrieve coordinates for current location
const getCoordinates = async(zipcode?:string, city?:string, state?:string):Promise<ResponseObj<any>> =>{
    let url = "";
    if(zipcode)
        url = `${Constants.COORDINATES_URL}${zipcode}`;
    else
        url = `${Constants.COORDINATES_URL}${Constants.STATE_CODES.get(state||"")}/${city?.replace(/ /g, Constants.SPACE)}`;
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        return handleError(error, Constants.COORDINATES_ERROR);
    }
};

//gets the timezone based on the provided coordinates
const getTimezone = async(latitude:string, longitude:string) =>{
    const API_URL = import.meta.env.VITE_API_URL;
    const url = `${API_URL}${Constants.GET_LOCATION_DETAILS}${Constants.LONGITUDE_PARAM}${longitude}${Constants.LATITUDE_PARAM}${latitude}`;
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        return handleError(error, Constants.TIMEZONE_ERROR);
    }
};

export default {getCoordinates, getTimezone};