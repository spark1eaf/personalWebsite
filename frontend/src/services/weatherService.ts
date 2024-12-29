import axios from "axios";
import * as Constants from "../constants/constants"
import handleError from "../utils/ErrorHandler";

//gets response containing endpoints for the provided coordinates
const getWeatherEndpoints = async(longitude:string, latitude:string):Promise<ResponseObj<any>> =>{
    const url = `${Constants.WEATHER_URL}${longitude},${latitude}`;
    try {
        const response = await axios.get(url);
        return response;
    } 
    catch (error) {
        return handleError(error, Constants.WEATHER_ENDPOINT_RETRIEVAL_ERROR);
    }
}

//retrieve weather data
const getlocalWeather = async(latitude:string, longitude:string):Promise<ResponseObj<any>> =>{
    try {
        const endpointsResponse = await getWeatherEndpoints(latitude,longitude);
        if(endpointsResponse.status === 200){
            //endpoint to get our weather data
            const url = endpointsResponse.data.properties.forecastHourly;
            const response = await axios.get(url);
            return response;
        }
        else{
            console.error(Constants.WEATHER_DATA_RETRIEVAL_ERROR);
            return {error: endpointsResponse.error};
        }
    }
    catch (error) {
        return handleError(error, Constants.WEATHER_DATA_RETRIEVAL_ERROR);
    }
};

export default {getlocalWeather};