import axios from "axios";
import * as Constants from "../constants/constants"

//gets response containing endpoints for the provided coordinates
const getWeatherEndpoints = async(longitude:string, latitude:string):Promise<ResponseObj<any>> =>{
    const url = `${Constants.WEATHER_URL}${longitude},${latitude}`;
    try {
        const response = await axios.get(url);
        return response;
    } 
    catch (error) {
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
            console.error(`Error retrieving weather endpoints: ${errorMessage}`)
            return {error: Constants.UNEXPECTED_ERROR_MSG };    
        }
    }
}
//     //retrieve weather data
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
            console.error("Error retrieving weather data");
            return {error: endpointsResponse.error};
        }
    }
    catch (error) {
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
            console.error(`Error retrieving weather data: ${errorMessage}`)
            return {error: Constants.UNEXPECTED_ERROR_MSG};
        }
    }
};
export default {getlocalWeather}