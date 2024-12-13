import { useEffect, useState } from "react";
import weatherService from "../../services/weatherService";
import * as Constants from "../../constants/constants";
import { WeatherPeriod, ResponsePeriod } from "./WeatherInterfaces";
import coordinatesService from "../../services/coordinatesService";

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

    useEffect(() => {
        if (zipcode && getByZip) 
            getLocationData();
    }, []);

    useEffect(() => {
        if (latitude && longitude) 
            getWeatherData();
    }, [latitude,longitude]);


    const test = weatherData[0] || "";

    return (
        <div className="weather-widget">
            {test ? <>
                     <h1 className="Weather-widget-title">{city}, {state}</h1>
                     <div className="weather-widget-specs">
                         {/* <p>{test.startTime}</p>
                         //work in current time later If i decide i want it.*/}
                         <p>{test.isDaytime}</p>
                         <p>Current Temperature: {test.temperature}°F</p>
                         <p>Humidity: {test.humidity}%</p>
                         <p>Precipitation Chance: {test.precipChance}%</p>
                         <p>Wind Speed: {test.windspeed}</p>
                         <p>Prediction: {test.shortForcast}</p>
                     </div>
            </> : null}
        </div>
    );
};

export default WeatherWidget;
