// Weather.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const apiKey = 'f7762ab029a0cdba9c2c103146e48e61';
  const city = 'uberaba';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        );
        setWeatherData(response.data);
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
        Temperature: {weatherData.main.temp} K
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
