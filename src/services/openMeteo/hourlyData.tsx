import {fetchWeatherApi} from 'openmeteo';
import 'url-search-params-polyfill';
import 'text-encoding';

async function fetchHourlyData(
  positionLatitude: Geocoder.fromParams,
  positionLongitude: Geocoder.fromParams,
) {
  const params = {
    latitude: positionLatitude,
    longitude: positionLongitude,
    hourly: ['temperature_2m', 'weather_code'],
    timezone: 'America/Sao_Paulo',
    forecast_days: 1,
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({length: (stop - start) / step}, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly
        .variables(0)!
        .valuesArray()!
        .map(value => Math.floor(value)),
      weatherCode: hourly.variables(1)!.valuesArray()!,
    },
  };
  return weatherData;
}
export default fetchHourlyData;
