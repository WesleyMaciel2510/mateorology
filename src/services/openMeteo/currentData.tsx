import {fetchWeatherApi} from 'openmeteo';
import 'url-search-params-polyfill';
import 'text-encoding';

async function fetchWeatherData(
  positionLatitude: Geocoder.fromParams,
  positionLongitude: Geocoder.fromParams,
) {
  const params = {
    latitude: positionLatitude,
    longitude: positionLongitude,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'rain',
      'weather_code',
      'wind_speed_10m',
    ],
    //for celsius and Km/h does not include anything
    /* temperature_unit: 'fahrenheit',
    wind_speed_unit: 'ms', */
    timezone: 'America/Sao_Paulo',
    forecast_days: 1,
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: Math.floor(current.variables(0)!.value()),
      relativeHumidity2m: current.variables(1)!.value(),
      rain: current.variables(3)!.value(),
      weatherCode: current.variables(4)!.value(),
      windSpeed10m: current.variables(5)!.value(),
    },
  };

  return weatherData;
}

export default fetchWeatherData;
