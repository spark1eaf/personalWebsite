import axios from 'axios';
import * as Constants from '../constants/constants'

const handleError = (error:unknown, errorPrefix:string): ResponseObj<any> =>{
    if (axios.isAxiosError(error)) {
        console.error(`Error: ${error.message}`, error);
        const statusCode = error.code === "ERR_NETWORK" ? 503 : error.response?.status
        return {
            status: statusCode,
            error: error.response?.data || Constants.ERROR_TRY_AGAIN_MSG
        };
    }
    else {
        const errorMessage = error instanceof Error ? error.message: Constants.UNEXPECTED_ERROR;
        console.error(`${errorPrefix}: ${errorMessage}`);
        return {error: Constants.UNEXPECTED_ERROR_MSG };
    }
};

export default handleError;