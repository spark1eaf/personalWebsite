import { useEffect, useState } from "react";
import weatherService from "../../services/weatherService";
import * as Constants from "../../constants/constants";
import { WeatherPeriod, ResponsePeriod } from "./WeatherInterfaces";
import coordinatesService from "../../services/coordinatesService";
import { forEach } from "lodash";

interface Props{
    zipcode:string,
    getByZip:boolean,
    currentCity?:string,
    currentState?:string,
    currentLongitude?:string,
    currentLatitude?:string
};

const WeatherWidget = ({zipcode, getByZip, currentCity, currentState, currentLongitude, currentLatitude}:Props) => {
    const [city, setCity] = useState(currentCity|| "");
    const [state, setState] = useState(currentState|| "");;
    const [longitude, setLongitude] = useState(currentLongitude || "");
    const [latitude, setLatitude] = useState(currentLatitude || "");
    const temp = sessionStorage.getItem("weatherData");
    const cachedWeatherData: WeatherPeriod[] = temp ? JSON.parse(temp) : [];
    const [weatherData, setWeatherData] = useState<WeatherPeriod[]>(cachedWeatherData);

    const getLocationData = async () => {
            const response = await coordinatesService.getCoordinates(zipcode);
            if (response.status === 200) {
                sessionStorage.setItem("city", response.data.places[0]["place name"]);
                setCity(response.data.places[0]["place name"]);
                sessionStorage.setItem("state", response.data.places[0].state);
                setState(response.data.places[0].state);
                setLongitude(response.data.places[0].longitude);
                setLatitude(response.data.places[0].latitude);
            } else if (response.status === 404)
                console.log("No coordinates found for provided zipcode");
    };

    const getWeatherData = async () => {
        const response = await weatherService.getlocalWeather(latitude, longitude);
        if (response.status === 200) {
            const periods: ResponsePeriod[] = response.data.properties.periods;
            const weatherData: WeatherPeriod[] = periods.map((period) => {
                return {
                    startTime: period.startTime,
                    endTime: period.endTime,
                    isDaytime: period.isDaytime,
                    temperature: period.temperature,
                    precipChance: period.probabilityOfPrecipitation.value,
                    humidity: period.relativeHumidity.value,
                    windspeed: period.windSpeed,
                    shortForcast: period.shortForecast,
                };
            });
            setWeatherData(weatherData);
            sessionStorage.setItem("weatherData", JSON.stringify(weatherData));
        }
    };
    //gets the current weather data set based on the time and day
    const fetchCurrentWeatherData = (): WeatherPeriod | null =>{
        const date = new Date();
        const offset = -date.getTimezoneOffset();      
        const current = new Date(date.getTime() + offset * 60 * 1000);
        const hourOffset = String(Math.abs(offset) / 60).padStart(2, '0');
        const timezone = `-${hourOffset}:00`;
        const currentISO = `${current.toISOString().substring(0, 19)}${timezone}`;
        const currentDate = currentISO.substring(0,10);
        const currentTime = currentISO.substring(11,16)
        let result: WeatherPeriod|null= null;
        weatherData.forEach(element =>{
            let ISOTime = element.startTime;
            const date = ISOTime.substring(0,10);
            const startTime = ISOTime.substring(11,16);
            ISOTime = element.endTime;
            const endTime = ISOTime.substring(11,16);
            console.log(startTime)
            console.log(endTime)
            if(currentDate === date && startTime < currentTime && currentTime < endTime)
                result = element;
        })
        return result;
    }

    useEffect(() => {
        if (zipcode && getByZip) 
            getLocationData();
    }, []);

    useEffect(() => {
        if (latitude && longitude) 
            getWeatherData();
    }, [latitude,longitude]);


    const currentWeather = fetchCurrentWeatherData();
    const currentTime = new Date().toLocaleTimeString();

    return (
        <div className="weather-widget">
            {currentWeather ? <>
                     <h1 className="Weather-widget-title">{city}, {state}</h1>
                     <div className="weather-widget-specs">
                         <p>Time: {currentTime}</p>
                         <p>Current Temperature: {currentWeather.temperature}°F</p>
                         <p>Humidity: {currentWeather.humidity}%</p>
                         <p>Precipitation Chance: {currentWeather.precipChance}%</p>
                         <p>Wind Speed: {currentWeather.windspeed}</p>
                         <p>Prediction: {currentWeather.shortForcast}</p>
                     </div>
            </> : null}
        </div>
    );
};

export default WeatherWidget;
