import {fetchWeatherApi} from 'openmeteo';
import 'url-search-params-polyfill';
import 'text-encoding';

async function fetchForecastData(): Promise<any> {
  const params = {
    latitude: -19.7483,
    longitude: -47.9319,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'rain_sum',
    ],
    timezone: 'America/Sao_Paulo',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({length: (stop - start) / step}, (_, i) => start + i * step);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  /* const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude(); */

  const daily = response.daily()!;

  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      precipitationSum: daily.variables(2)!.valuesArray()!,
      rainSum: daily.variables(3)!.valuesArray()!,
    },
  };

  for (let i = 0; i < weatherData.daily.time.length; i++) {
    /* console.log(
      weatherData.daily.time[i].toISOString(),
      weatherData.daily.temperature2mMax[i],
      weatherData.daily.temperature2mMin[i],
      weatherData.daily.precipitationSum[i],
      weatherData.daily.rainSum[i],
    ); */
    return weatherData;
  }
}

export default fetchForecastData;
