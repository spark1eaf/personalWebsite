import { CSSProperties, useEffect, useState } from "react";
import * as Constants from "../../../constants/constants";
import locationService from "../../../services/locationService";
import weatherService from "../../../services/weatherService";
import { WeatherPeriod, ResponsePeriod } from "./WeatherInterfaces";

interface Props{
    zipcode:string,
    getByZip:boolean,
    currentCity?:string,
    currentState?:string,
    currentLongitude?:string,
    currentLatitude?:string
    currentTimezone?:number,
    setWindowToDisplay: React.Dispatch<React.SetStateAction<string>>
};

const WeatherWidget = ({zipcode, getByZip, currentCity, currentState, currentLongitude, currentLatitude, currentTimezone, setWindowToDisplay}:Props) => {
    let currentTimeAndDate = "";
    const [city, setCity] = useState(currentCity|| sessionStorage.getItem(Constants.SESSION_CITY_LOCATION));
    const [state, setState] = useState(currentState|| sessionStorage.getItem(Constants.SESSION_STATE_LOCATION));;
    const [longitude, setLongitude] = useState(currentLongitude || sessionStorage.getItem(Constants.SESSION_LONGITUDE) || "");
    const [latitude, setLatitude] = useState(currentLatitude || sessionStorage.getItem(Constants.SESSION_LATITUDE) || "");
    const temp = sessionStorage.getItem(Constants.SESSION_WEATHER_DATA);
    const cachedWeatherData: WeatherPeriod[] = temp ? JSON.parse(temp) : [];
    const [weatherData, setWeatherData] = useState<WeatherPeriod[]>(cachedWeatherData);


    const getLocationData = async () => {
            const response = await locationService.getCoordinates(zipcode);
            if (response.status === 200) {
                //store fields for caching
                sessionStorage.setItem(Constants.SESSION_CITY_LOCATION, response.data.places[0]["place name"]);
                sessionStorage.setItem(Constants.SESSION_STATE_LOCATION, response.data.places[0].state);
                sessionStorage.setItem(Constants.SESSION_LONGITUDE, response.data.places[0].longitude)
                sessionStorage.setItem(Constants.SESSION_LATITUDE, response.data.places[0].latitude)
                setCity(response.data.places[0]["place name"]);
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
            //cache data
            console.log("weather data cached")

            sessionStorage.setItem(Constants.SESSION_WEATHER_DATA, JSON.stringify(weatherData));
            setWeatherData(weatherData);
        }
    };
    //gets the current weather data set based on the time and day
    const fetchCurrentWeatherData = (): WeatherPeriod | null =>{
        const date = new Date(); 
        const  offset = currentTimezone ? currentTimezone * 60 : -date.getTimezoneOffset();
        const current = new Date(date.getTime() + offset * 60 * 1000);
        const hourOffset = String(Math.abs(offset) / 60).padStart(2, '0');
        const timezone = `-${hourOffset}:00`;
        const currentISO = `${current.toISOString().substring(0, 19)}${timezone}`;
        const currentDate = currentISO.substring(0,10);
        const currentTime = currentISO.substring(11,16);
        currentTimeAndDate = currentISO.substring(11,16);
        let result: WeatherPeriod|null= null;
        weatherData.forEach(element =>{
            let ISOTime = element.startTime;
            const date = ISOTime.substring(0,10);
            const startTime = ISOTime.substring(11,16);
            ISOTime = element.endTime;
            let endTime = ISOTime.substring(11,16);
            //handle issue with time rollover for finding the weather period
            if(endTime === "00:00")
                endTime = "24:01";
            // Compare current date and time with the weather period's start and end times.
            if (currentDate === date && startTime < currentTime && currentTime < endTime) {
                result = element;
            }
        })
        return result;
    }

    const displayWeeklyForecast = () =>{
        setWindowToDisplay(Constants.WEEKLY_FORECAST_WINDOW);
    }

    useEffect(() => {
        if (zipcode && getByZip && !city && !state) 
            getLocationData();
    }, []);

    useEffect(() => {
        if (latitude && longitude && weatherData.length === 0)
            getWeatherData();
    }, [latitude,longitude]);

    const currentWeather = fetchCurrentWeatherData();
    const temperature: number|undefined = currentWeather?.temperature;

    const tempStyle:CSSProperties = temperature !== undefined ? {
            color: temperature > 90 ? 'red' : temperature > 70 ? 'orange' : temperature > 40 ? 'white' :'rgb(43, 156, 231)',
            fontWeight: temperature > 80 ? 'bold' : 'normal',
    } :{};

    return (
        <div className="weather-widget">
            {currentWeather ? <>
                     <h1 className="Weather-widget-title">{city}, {state}</h1>
                     <div className="weather-widget-specs">
                         <p>Time: {currentTimeAndDate}</p>
                         <p style={tempStyle}>Current Temperature: {currentWeather.temperature}°F</p>
                         <p>Humidity: {currentWeather.humidity}%</p>
                         <p>Precipitation Chance: {currentWeather.precipChance}%</p>
                         <p>Wind Speed: {currentWeather.windspeed}</p>
                         <p>Prediction: {currentWeather.shortForcast}</p>
                     </div>
                     <button onClick={displayWeeklyForecast} className="view-forcast-btn">Click to view this week's forcast</button>
            </> : null}
        </div>
    );
};

export default WeatherWidget;