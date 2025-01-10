import { CSSProperties, MouseEventHandler, useEffect, useState } from "react";
import { throttle } from "lodash";
import WindowCloseBtn from "../../buttons/WindowCloseBtn";
import { WeatherPeriod } from "../../widgets/weather/WeatherInterfaces";
import * as Constants from "../../../constants/constants"

interface Props{
    closeWindow:MouseEventHandler<HTMLButtonElement>,
    currentTimezone?:number
}

interface WeeklyData{
    date:String,
    dayOfWeek:String,
    tempHigh:number,
    tempLow:number,
    precipChances:number[],
    humidities:number[]
}

const WeeklyForecastWindow = ({closeWindow, currentTimezone}: Props) =>{
    const [forecastList, setForecastList] = useState<WeeklyData[]>();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [elementToDisplay, setElementToDisplay] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [hoverLeft, setHoverLeft] = useState(false)
    const [hoverRight, setHoverRight] = useState(false)

    const getWeeksData = () =>{
        const data:WeatherPeriod[] = JSON.parse(sessionStorage.getItem(Constants.SESSION_WEATHER_DATA) || "[]");
        const weeklyData: WeeklyData[] = [];

        if(data !== null){
            for(let i = 0; i < data.length; i++){            
                const dateObj = new Date(data[i].startTime);
                const currentDate = data[i].startTime.substring(0,10);

                if (currentTimezone !== undefined) {
                    const offset = currentTimezone * 60;
                    const utcMinutes = dateObj.getUTCMinutes() + dateObj.getTimezoneOffset();
                    dateObj.setUTCMinutes(utcMinutes + offset);
                }

                if (weeklyData.length === 0 || weeklyData[weeklyData.length-1].date !== currentDate){
                    const currentDay:WeeklyData = {date: currentDate, dayOfWeek: weekdays[dateObj.getDay()], tempHigh: data[i].temperature, tempLow:data[i].temperature, precipChances: [data[i].precipChance/100], humidities: [data[i].humidity/100]};
                    weeklyData.push(currentDay);
                }

                else{
                    const currentDay = weeklyData.pop();
                    if(currentDay){
                        currentDay.tempHigh = Math.max(currentDay.tempHigh, data[i].temperature);
                        currentDay.tempLow = Math.min(currentDay.tempLow, data[i].temperature);
                        currentDay.precipChances.push(data[i].precipChance/100);
                        currentDay.humidities.push(data[i].humidity/100);
                        weeklyData.push(currentDay);
                    }
                }
            }
        }
        setForecastList(weeklyData);
    }

    const showPreviousSet = () =>{
        if(elementToDisplay > 0)
            setElementToDisplay(currentElement => currentElement - 1)
    }

    const showNextSet = () =>{
        if(forecastList && elementToDisplay < forecastList.length - 1)
            setElementToDisplay(currentElement => currentElement + 1)
    }

    const getAverage = (data: number[]) =>{
        let total = 0;
        data.forEach(element => {
            total += element
        });
        return Math.round(total / data.length * 100);
    }

    useEffect(() => {
        const handleResize = throttle(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }, 100);
    
        window.addEventListener("resize", handleResize);
            
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        
    }, []);

    useEffect(() =>{
        getWeeksData();
    },[])

    const isMobileView = windowSize.width <=1300 ? true : false;

    const weatherNavLeftStyle:CSSProperties = elementToDisplay !== undefined ? {
        color: elementToDisplay === 0 ? 'black' : hoverLeft ? 'black' : 'white'
    } :{};
    const weatherNavRightStyle:CSSProperties = elementToDisplay !== undefined ? {
        color: elementToDisplay === 6 ? 'black' : hoverRight ? 'black' : 'white'
    } :{};

    if(isMobileView && forecastList){
        const dayToDisplay = forecastList[elementToDisplay];
        return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <div className="weatherset-container-mobile">
                    <button style={weatherNavLeftStyle} onClick={showPreviousSet} className="weatherset-select-btn" onMouseEnter={() => setHoverLeft(true)} onMouseLeave={() => setHoverLeft(false)}>{"<"}</button>
                    <div className="weatherset-mobile">
                        <h1>{dayToDisplay.dayOfWeek}</h1>
                        <p className="weatherset-date">{dayToDisplay.date}</p>
                        <p>High: {dayToDisplay.tempHigh}°F</p>
                        <p>Low: {dayToDisplay.tempLow}°F</p>
                        <p>Precipitation Chance: {getAverage(dayToDisplay.precipChances)}%</p>
                        <p>Average Humidity: {getAverage(dayToDisplay.humidities)}%</p>
                    </div>
                    <button style={weatherNavRightStyle} onClick={showNextSet} className="weatherset-select-btn" onMouseEnter={() => setHoverRight(true)} onMouseLeave={() => setHoverRight(false)} >{">"}</button>
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <WindowCloseBtn closeWindow={closeWindow} />
                <div className="weatherset-container">
                    {forecastList ? 
                        forecastList.map((element, index) => {
                            return(
                                <div key={index} className="weatherset">
                                    <h1>{element.dayOfWeek}</h1>
                                    <p className="weatherset-date">{element.date}</p>
                                    <p>High: {element.tempHigh}°F</p>
                                    <p>Low: {element.tempLow}°F</p>
                                    <p>Precipitation Chance: {getAverage(element.precipChances)}%</p>
                                    <p>Average Humidity: {getAverage(element.humidities)}%</p>
                                </div>
                            )
                        }) 
                    : null}
                </div>
            </>
        )
    }
}

export default WeeklyForecastWindow;