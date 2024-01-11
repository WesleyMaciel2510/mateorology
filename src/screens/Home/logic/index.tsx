import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import fetchWeatherData from '../../../services/openMeteo/openMeteo';
import fetchForecastData from '../../../services/openMeteo/nextForecast';
import {
  requestLocationPermission,
  checkLocationPermission,
} from '../../../services/askPermission';
import {PermissionsAndroid} from 'react-native';
import {getDescription} from '../../../components/getDescription';

type PositionType = {
  latitude: number;
  longitude: number;
};

export const useStateVariables = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [rain, setRain] = useState(0);
  const [temperature, setTemperature] = useState([]);
  const [windSpeed, setWindSpeed] = useState('');
  const [date, setDate] = useState([]);
  const [temperatureHourly, setTemperatureHourly] = useState([]);
  const [weatherCodeHourly, setWeatherCodeHourly] = useState([]);
  const [nextHours, setNextHours] = useState([]);
  const [week, setWeek] = useState([]);
  const [forecastTemperature, setForecastTemperature] = useState<{
    temperature2mMin: string[];
    temperature2mMax: string[];
  }>({temperature2mMin: [], temperature2mMax: []});
  const [position, setPosition] = useState<PositionType | null>(null);
  const [weatherCode, setWeatherCode] = useState(null);

  return {
    locationPermission,
    setLocationPermission,
    cityName,
    setCityName,
    description,
    setDescription,
    humidity,
    setHumidity,
    rain,
    setRain,
    temperature,
    setTemperature,
    windSpeed,
    setWindSpeed,
    date,
    setDate,
    temperatureHourly,
    setTemperatureHourly,
    weatherCodeHourly,
    setWeatherCodeHourly,
    nextHours,
    setNextHours,
    week,
    setWeek,
    forecastTemperature,
    setForecastTemperature,
    position,
    setPosition,
    weatherCode,
    setWeatherCode,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setLocationPermission,
    setCityName,
    setDescription,
    setTemperatureHourly,
    setNextHours,
    setHumidity,
    setRain,
    setTemperature,
    setWindSpeed,
    setForecastTemperature,
    setWeatherCode,
    setWeatherCodeHourly,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');

    // ================================================
    //Asking for Permission only if not granted to optimize the app
    const requestLocation = async () => {
      const locationStatus = await requestLocationPermission();

      if (locationStatus === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('1 @ PEGOU PERMISSAO !');
        setLocationPermission(true);
      }
      if (locationStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('O USUÁRIO DEVE LIMPAR OS DADOS');
      }
    };
    const checkLocation = async () => {
      const locationStatus = await checkLocationPermission();
      console.log('Location permission:', locationStatus);
      if (locationStatus === false) {
        requestLocation();
      } else {
        setLocationPermission(true);
      }
    };
    checkLocation();

    // ================================================
    const fetchOpenMeteoData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        console.log('2 @ PEGOU weatherData !');

        // TITLE  ===================================
        setCityName(weatherData.current.name);
        setWeatherCode(Math.floor(weatherData.current.weatherCode));
        const weatherDescription = getDescription(
          weatherData.current.weatherCode,
        );
        setDescription(weatherDescription);
        const formattedValues = [
          weatherData.current.temperature2m,
          weatherData.daily.temperature2mMin[0],
          weatherData.daily.temperature2mMax[0],
        ].map(value => Math.floor(value));
        setTemperature(formattedValues);
        setHumidity(weatherData.current.relativeHumidity2m);
        setRain(weatherData.current.rain);
        setWindSpeed(weatherData.current.windSpeed10m.toString().slice(0, 2));
        // TODAY AREA ===================================
        // Creating a new array that gets the next hours
        const currentHour = new Date().getHours();
        const hours = [];
        for (let i = 0; i < 24; i++) {
          const nextHour = (currentHour + i) % 24;
          const formattedHour =
            nextHour > -1 && nextHour < 10 ? `0${nextHour}` : String(nextHour);
          hours.push(formattedHour);
        }
        //console.log('HORAS = ', hours);

        setNextHours(hours);
        //formatting all the temperatures to get two decimal places
        const formattedArray = Array.from(weatherData.hourly.temperature2m).map(
          value => Math.floor(value),
        );
        setTemperatureHourly(formattedArray);
        /* console.log(
          'TEMPERATURAS = ',
          weatherData.hourly.temperature2m.map(value => Math.floor(value)),
        ); */
        setWeatherCodeHourly(Array.from(weatherData.hourly.weatherCode));
        //console.log('CODES HOURLY = ', weatherData.hourly.weatherCode);

        /* for (let i = 0; i < weatherData.hourly.time.length; i++) {
          console.log('TEMPO = ', weatherData.hourly.time[i]);
        } */

        // =============================================
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    fetchOpenMeteoData();
    // ================================================
    const fetchForecast = async () => {
      try {
        const forecastData = await fetchForecastData();
        //formatting to get only the two digits of the arrays
        const oldArrayMin = forecastData.daily.temperature2mMin;
        const formattedArrayToMin = oldArrayMin.map((value: string) => {
          const formattedValue = parseInt(value, 10).toString();
          return formattedValue;
        });
        //console.log('formattedArrayMin === ', formattedArrayToMin);
        // ----------------------------------------------------------
        const oldArrayMax = forecastData.daily.temperature2mMax;
        const formattedArrayToMax = oldArrayMax.map((value: string) => {
          const formattedValue = parseInt(value, 10).toString();
          return formattedValue;
        });
        //console.log('formattedArrayMax === ', formattedArrayToMax);

        // ----------------------------------------------------------
        const newTemperatureObject = {
          temperature2mMin: formattedArrayToMin,
          temperature2mMax: formattedArrayToMax,
        };
        setForecastTemperature(newTemperatureObject);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    fetchForecast();
    // ================================================
  }, []);
  useOnGetDate();
  useOnGetWeek();
};

export const useOnGetDate = () => {
  const {setDate} = useSharedState();
  useEffect(() => {
    //console.log('chamou useOnGetDate');
    const getCurrentDate = () => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = getCurrentMonth(currentDate.getMonth());

      setDate([day, month]);
    };

    const getCurrentMonth = (monthIndex: number): string => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return months[monthIndex];
    };

    getCurrentDate();
  }, [setDate]);
};

export const useOnGetWeek = () => {
  const {setWeek} = useSharedState();

  const getWeekdays = () => {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentWeekdays = [];

    for (let i = 0; i < 7; i++) {
      const index = (currentDayIndex + i) % 7;
      currentWeekdays.push(weekdays[index]);
    }

    return currentWeekdays;
  };

  useEffect(() => {
    const weekDays = getWeekdays();
    setWeek(weekDays);
  }, [setWeek]);
};
