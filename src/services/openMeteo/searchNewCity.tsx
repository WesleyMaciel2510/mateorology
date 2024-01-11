import {fetchWeatherApi} from 'openmeteo';

async function fetchNewCityData(positionLatitude, positionLongitude) {
  console.log('CHAMOU fetchNewCityData');
  console.log('LAT = ', positionLatitude);
  console.log('LONG = ', positionLongitude);

  const params = {
    latitude: positionLatitude,
    longitude: positionLongitude,
    current: ['temperature_2m', 'relative_humidity_2m', 'weather_code'],
    daily: ['temperature_2m_max', 'temperature_2m_min'],
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

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      weatherCode: current.variables(2)!.value(),
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

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    console.log(
      weatherData.daily.time[i].toISOString(),
      weatherData.daily.temperature2mMax[i],
      weatherData.daily.temperature2mMin[i],
    );
  }
  return weatherData;
}

export default fetchNewCityData;
