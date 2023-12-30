import axios from 'axios';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const apiKey = 'f7762ab029a0cdba9c2c103146e48e61';
const city = 'uberaba';
const units = 'metric';

export const getWeatherDataByCity = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
    );
    console.log('chamou getWeatherDataByCity');

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
