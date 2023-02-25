type weatherDataType = {
    currWeather: string;
    temp: number;
    iconURL: string;
    windSpeed: number;
    windPressure: number;
    forecast: weatherForecastType[];
};

type weatherForecastType = {
    weekday: string;
    iconURL: string;
    high: number;
    low: number;
};