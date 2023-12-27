import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const apiKey = 'f7762ab029a0cdba9c2c103146e48e61';
  const city = 'uberaba';
  // Specify units as 'metric' for Celsius, 'imperial' for Fahrenheit, or 'standard' for Kelvin
  const units = 'metric'; // or 'imperial' or 'standard'

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        );
        setWeatherData(response.data);
        console.log('RESULT === ', response);
        console.log('typeof response == ', response);

        const temperatureIntegerPart = Math.floor(response.data.main.temp);

        console.log('temperatureIntegerPart === ', temperatureIntegerPart);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>
        Temperature: {Math.floor(weatherData.main.temp)}
      </Text>
      <Text style={styles.humidity}>
        Humidity: {weatherData.main.humidity}%
      </Text>
      <Text style={styles.description}>
        Weather: {weatherData.weather[0].description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  humidity: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
});

export default Weather;
