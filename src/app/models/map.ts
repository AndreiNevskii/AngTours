export interface IWeatherResponce {
    current: IWeatherCurrent;
    hourly: IWeatheHourly;
}

export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
  is_day: WeatherCurrentValue,
  rain: WeatherCurrentValue,
  snowfall: WeatherCurrentValue,
}
    

export interface IWeatheHourly {
  temperature_2m: number[];
}

export interface IWeatherMap {
  isDay: WeatherCurrentValue,
  snowfall: WeatherCurrentValue,
  rain: WeatherCurrentValue,
  currentWeather:IWeatheHourly
}