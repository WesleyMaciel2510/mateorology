import {fetchWeatherApi} from 'openmeteo';
import 'url-search-params-polyfill';
import 'text-encoding';

async function fetchWeatherData(): Promise<any> {
  const params = {
    latitude: -19.7483,
    longitude: -47.9319,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'is_day',
      'precipitation',
      'rain',
      'wind_speed_10m',
    ],
    hourly: 'temperature_2m',

    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
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

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      isDay: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
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
      rainSum: daily.variables(2)!.valuesArray()!,
      precipitationSum: daily.variables(2)!.valuesArray()!,
      precipitationProbabilityMax: daily.variables(3)!.valuesArray()!,
    },
  };

  // LOG FOR DAILY
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    /* console.log(
      'Date:',
      weatherData.daily.time[i].toISOString(),
      'Max Temperature:',
      weatherData.daily.temperature2mMax[i],
      'Min Temperature:',
      weatherData.daily.temperature2mMin[i],
    ); */
  }
  /* console.log(
    'RainSum: ',
    weatherData.daily.rainSum[0],
    'PrecipitationSum: ',
    weatherData.daily.precipitationSum[0],
    'Precipitation Probability Max: ',
    weatherData.daily.precipitationProbabilityMax[0],
  ); */
  // ========================================================
  /*  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const twoDigitHour = (currentHour < 10 ? '0' : '') + currentHour;
  const index = parseInt(twoDigitHour, 10);
  const arrayTemperature = [];
  function getTemperatureHourly(index) {
    //for starts in the current hour and executes 4 times
    for (let i = index; i < index + 4; i++) {
      arrayTemperature.push(
        weatherData.hourly.temperature2m[i].toString().slice(0, 2),
      );
      console.log(
        'HORÁRIO == ',
        weatherData.hourly.time[i].toISOString(),
        'TEMPRATURA == ',
        weatherData.hourly.temperature2m[i].toString().slice(0, 2),
      );
      console.log('arrayTemperature === ', arrayTemperature);
    }
    return arrayTemperature;
  }
  getTemperatureHourly(index); */
  // ========================================================

  /*
  //LOG FOR CURRENT
  console.log('Current Weather Data');
  console.log('Date:', weatherData.current.time.toISOString());
  console.log(
    'Temperature in Celsius:',
    weatherData.current.temperature2m.toString().slice(0, 2),
  );
  console.log('Relative Humidity:', weatherData.current.relativeHumidity2m);
  console.log('Is Day:', weatherData.current.isDay);
  console.log('Precipitation:', weatherData.current.precipitation);
  console.log('Rain:', weatherData.current.rain);
  console.log(
    'Wind Speed at 10m Km/h:',
    weatherData.current.windSpeed10m.toString().slice(0, 3),
  ); */

  return weatherData;
}

export default fetchWeatherData;
