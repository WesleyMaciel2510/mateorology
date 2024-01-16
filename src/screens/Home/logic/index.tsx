import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import fetchCurrentData from '../../../services/openMeteo/currentData';
import fetchHourlyData from '../../../services/openMeteo/hourlyData';
import fetchForecastData from '../../../services/openMeteo/nextForecast';
import {
  requestLocationPermission,
  checkLocationPermission,
} from '../../../services/askPermission';
import {PermissionsAndroid} from 'react-native';
import {getDescription} from '../../../components/getDescription';
import {getPosition} from '../../../services/getPosition';
import {getCityName} from '../../../services/getCityName';
import {storage} from '../../../services/storage';

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
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState('');
  const [date, setDate] = useState([]);
  const [temperatureHourly, setTemperatureHourly] = useState([]);
  const [weatherCodeHourly, setWeatherCodeHourly] = useState([]);
  const [weatherCodeDaily, setWeatherCodeDaily] = useState([]);
  const [hour, setHour] = useState([]);
  const [week, setWeek] = useState([]);
  const [forecastTemperature, setForecastTemperature] = useState({
    tempMin: [] as number[],
    tempMax: [] as number[],
  });
  const [position, setPosition] = useState<PositionType | null>(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [updateAllData, setUpdateAllData] = useState(true);

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
    weatherCodeDaily,
    setWeatherCodeDaily,
    hour,
    setHour,
    week,
    setWeek,
    forecastTemperature,
    setForecastTemperature,
    position,
    setPosition,
    weatherCode,
    setWeatherCode,
    updateAllData,
    setUpdateAllData,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setLocationPermission,
    setCityName,
    setDescription,
    setTemperatureHourly,
    setHour,
    setHumidity,
    setRain,
    setTemperature,
    setWindSpeed,
    setForecastTemperature,
    setWeatherCode,
    setWeatherCodeHourly,
    setWeatherCodeDaily,
    setDate,
    setWeek,
    updateAllData,
    setUpdateAllData,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');
    // ================================================
    // LOAD STORAGE DATA ==============================
    const storedCurrentDay = storage.getString('currentDay');
    // ================================================
    const currentDate = new Date();
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    console.log(
      'currentDay = ',
      currentDay,
      'storedCurrentDay = ',
      storedCurrentDay,
    );
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
    const fetchCurrent = async (
      lat: Geocoder.fromParams,
      long: Geocoder.fromParams,
    ) => {
      try {
        const {current} = await fetchCurrentData(lat, long);

        // TITLE AREA ==================================
        setTemperature(current.temperature2m);
        setHumidity(current.relativeHumidity2m);
        setRain(current.rain);

        setWeatherCode(Math.floor(current.weatherCode));
        setWindSpeed(current.windSpeed10m.toString().slice(0, 2));
        const weatherDescription = getDescription(current.weatherCode);
        setDescription(weatherDescription);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    const fetchHourly = async (
      lat: Geocoder.fromParams,
      long: Geocoder.fromParams,
    ) => {
      try {
        // TODAY AREA ===================================
        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        setHour(hoursArray);
        const {hourly} = await fetchHourlyData(lat, long);

        // Formatting all the temperatures to get two decimal places
        const formattedArray = Array.from(hourly.temperature2m).map(value =>
          Math.floor(value),
        );

        setTemperatureHourly(formattedArray);
        setWeatherCodeHourly(Array.from(hourly.weatherCode));
      } catch (error) {
        console.error('Failed to fetch Daily Data:', error);
      }
    };
    // ================================================

    const fetchForecast = async (
      lat: Geocoder.fromParams,
      long: Geocoder.fromParams,
    ) => {
      try {
        const forecastData = await fetchForecastData(lat, long);
        setForecastTemperature({
          tempMin: forecastData.daily.temperature2mMin,
          tempMax: forecastData.daily.temperature2mMax,
        });
        setWeatherCodeDaily(forecastData.daily.weatherCode);
      } catch (error) {
        console.error('Failed to fetch forecast Data:', error);
      }
    };
    // ================================================
    //If permission is granted, getCurrentPosition
    const requestCurrentPosition = async () => {
      const {positionLatitude, positionLongitude} = await getPosition();
      const cityName = await getCityName(positionLatitude, positionLongitude);
      setCityName(cityName);

      return {positionLatitude, positionLongitude};
    };
    // ================================================
    const optimizer = async () => {
      const {positionLatitude, positionLongitude} =
        await requestCurrentPosition();
      //Store the currentDay, if the storedCurrentDay is the same as currentDay,
      //You don't need to request daily and hourly Weather Data, else, request all
      if (currentDay === storedCurrentDay) {
        console.log('atualiza dados do momento');
        setUpdateAllData(false);
        fetchCurrent(positionLatitude, positionLongitude);

        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        setHour(hoursArray);
      } else {
        console.log('atualiza tudo');
        getDate();
        getWeek();
        // CURRENT HOUR =====
        fetchCurrent(positionLatitude, positionLongitude);

        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        setHour(hoursArray);

        // CURRENT DAY =====
        fetchHourly(positionLatitude, positionLongitude);
        fetchForecast(positionLatitude, positionLongitude);
      }
    };
    optimizer();
  }, []);
};

export const getDate = () => {
  console.log('chamou useOnGetDate');
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

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = getCurrentMonth(currentDate.getMonth());
  storage.set('currentDay', day);
  storage.set('currentMonth', month);

  //const fullDate = [day, month];
  //return fullDate;
};

export const getWeek = () => {
  console.log('chamou getWeek');

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
  console.log('weeks = ', currentWeekdays);
  storage.set('currentWeekdays', JSON.stringify(currentWeekdays));

  //return currentWeekdays;
};
