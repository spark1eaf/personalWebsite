export interface WeatherPeriod{
    startTime:string,
    endTime:string,
    isDaytime:boolean,
    temperature:number,
    precipChance:number,
    humidity:number,
    windspeed:string,
    shortForcast:string
}

export interface ResponsePeriod{
    startTime: string,
    endTime: string,
    isDaytime: boolean,
    temperature: number,
    probabilityOfPrecipitation: { value: number },
    relativeHumidity: { value: number },
    windSpeed: string,
    shortForecast: string,
}