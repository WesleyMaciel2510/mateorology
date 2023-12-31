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
const lat = '-19.7502';
const long = '-47.9325';

export const getWeatherData = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`,
    );
    console.log('chamou getWeatherData');

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

/* weatherData ===  {"base": "stations", "clouds": {"all": 40}, "cod": 200, "coord": {"lat": -19.7502, "lon": -47.9325}, "dt": 1703978489, "id": 3445839, "main": {"feels_like": 299.09, "humidity": 78, "pressure": 1015, "temp": 298.47, "temp_max": 298.47, "temp_min": 298.47}, "name": "Uberaba", "rain": {"1h": 0.24}, "sys": {"country": "BR", "id": 8472, "sunrise": 1703925282, "sunset": 1703973193, "type": 1}, "timezone": -10800, "visibility": 10000, "weather": [{"description": "light rain", "icon": "10n", "id": 500, "main": "Rain"}], "wind": {"deg": 180, "speed": 3.6}} */
