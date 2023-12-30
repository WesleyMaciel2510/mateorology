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

//const apiKey = 'f7762ab029a0cdba9c2c103146e48e61';
const apiKey = 'f7762ab029a0cdba9c2c103146e48e61';
const lat = '-19.7502';
const long = '-47.9325';

export const getForecast = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`,
    );
    console.log('chamou getForecast');

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
