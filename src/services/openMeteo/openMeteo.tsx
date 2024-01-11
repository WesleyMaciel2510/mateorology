import {fetchWeatherApi} from 'openmeteo';
import {getPosition} from '../../services/getPosition';
import Geocoder from 'react-native-geocoding';

async function fetchWeatherData() {
  console.log('CHAMOU fetchWeatherData');
  Geocoder.init('AIzaSyAJUuqlYBMZ16g8R2nSQdS2dbisXqfKcpI', {language: 'en'});

  const currentPosition = await getPosition();
  const positionLatitude: number = currentPosition.coords.latitude.toFixed(4);
  //console.log('positionLatitude = ', positionLatitude);

  const positionLongitude: number = currentPosition.coords.longitude.toFixed(4);
  //console.log('positionLongitude = ', positionLongitude);
  const cityInfo = await Geocoder.from(positionLatitude, positionLongitude);
  //console.log('cityInfo = ', cityInfo);

  //formatting string to get city's name from latlong
  const address = cityInfo.results[0].formatted_address;
  //console.log('address = ', address);
  const firstDashIndex = address.indexOf('-');
  const secondDashIndex = address.indexOf('-', firstDashIndex + 1);
  const firstCommaIndex = address.indexOf(',');
  const secondCommaIndex = address.indexOf(',', firstCommaIndex + 1);
  const cityName = address
    .substring(secondCommaIndex + 1, secondDashIndex)
    .trim();

  console.log('cityName = ', cityName);

  const params = {
    latitude: positionLatitude,
    longitude: positionLongitude,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'rain',
      'weather_code',
      'wind_speed_10m',
    ],
    hourly: 'temperature_2m',
    daily: ['temperature_2m_max', 'temperature_2m_min'],
    timezone: 'America/Sao_Paulo',
    forecast_days: 1,
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({length: (stop - start) / step}, (_, i) => start + i * step);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData = {
    current: {
      name: cityName,
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      rain: current.variables(3)!.value(),
      weatherCode: current.variables(4)!.value(),
      windSpeed10m: current.variables(5)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
    },
  };
  // ==================== LOG FOR CURRENT ====================
  //console.log('CURRENT INFO = ', weatherData.current);

  // ==================== LOG FOR DAILY ====================
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  /* for (let i = 0; i < weatherData.daily.time.length; i++) {
    console.log(
      weatherData.daily.time[i].toISOString(),
      weatherData.daily.temperature2mMax[i],
      weatherData.daily.temperature2mMin[i],
    );
  } */

  return weatherData;
}

export default fetchWeatherData;
