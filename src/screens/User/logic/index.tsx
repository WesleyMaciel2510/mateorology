import {useEffect, useState} from 'react';
import {Linking, Alert} from 'react-native';
import {useBetween} from 'use-between';
import {requestLocationPermission} from '../../../services/askPermission';
import {storage} from '../../../services/storage';
import RNRestart from 'react-native-restart';
import {useSharedState as useSharedStateHome} from '../../Home/logic';

export const useStateVariables = () => {
  const [toggleButton, setToggleButton] = useState([true, true, true]);
  const [primaryColor, setPrimaryColor] = useState('#30ACDD');
  const [secondaryColor, setSecondaryColor] = useState('#288CC3');
  const [fahrenheit, setFahrenheit] = useState(false);
  const [metersToSeconds, setMetersToSeconds] = useState(false);

  return {
    toggleButton,
    setToggleButton,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    fahrenheit,
    setFahrenheit,
    metersToSeconds,
    setMetersToSeconds,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};
export const useOnHandlePress = () => {
  let url: string;
  const handlePress = (pressedItem: number) => {
    pressedItem === 1
      ? (url = 'https://openweathermap.org/')
      : (url = 'https://open-meteo.com/en/docs');
    Linking.openURL(url);
  };
  return handlePress;
};

export const useOnToggleButtonPress = () => {
  const {
    toggleButton,
    setToggleButton,
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
    setFahrenheit,
    setMetersToSeconds,
  } = useSharedState();
  const {
    temperature,
    setTemperature,
    temperatureHourly,
    setTemperatureHourly,
    temperatureDaily,
    setTemperatureDaily,
    windSpeed,
    setWindSpeed,
  } = useSharedStateHome();
  const changeToggleButton = (pressedItem: number) => {
    console.log('pressed Item = ', pressedItem);
    setToggleButton(prevState => {
      prevState[pressedItem] = !toggleButton[pressedItem];
      return [...prevState];
    });
    const celsiusToFahrenheit = (pressedItem: number) => {
      console.log('chamou celsiusToFahrenheit');
      if (toggleButton[pressedItem] === true) {
        console.log('toggleButton ON ');
        const convertedCelsius = getCelsius(
          temperature,
          temperatureHourly,
          temperatureDaily,
        );
        setTemperature(convertedCelsius.fahrenheitToCelsius);
        setTemperatureHourly(convertedCelsius.hourlyCelsius);
        setTemperatureDaily({
          tempMin: convertedCelsius.temperatureDaily.tempMin,
          tempMax: convertedCelsius.temperatureDaily.tempMax,
        });
        setFahrenheit(false);
      } else {
        console.log('toggleButton OFF ');
        const convertedFahrenheit = getFahrenheit(
          temperature,
          temperatureHourly,
          temperatureDaily,
        );

        setTemperature(convertedFahrenheit.celsiusToFahrenheit);
        setTemperatureHourly(convertedFahrenheit.hourlyFahrenheit);
        setTemperatureDaily({
          tempMin: convertedFahrenheit.temperatureDaily.tempMin,
          tempMax: convertedFahrenheit.temperatureDaily.tempMax,
        });
        setFahrenheit(true);
      }
    };
    const metersToSeconds = (pressedItem: number) => {
      console.log('chamou metersToSeconds');
      let convertedMetersToSecond: number;
      let convertedKilometersToHour: number;
      //let formattedValue: string;
      toggleButton[pressedItem] === true
        ? (console.log('toggleButton ON'),
          (convertedKilometersToHour = getKilometersToHour(windSpeed)),
          setWindSpeed(convertedKilometersToHour),
          setMetersToSeconds(false))
        : (console.log('toggleButton OFF'),
          (convertedMetersToSecond = getMetersToSecond(windSpeed)),
          setWindSpeed(convertedMetersToSecond),
          setMetersToSeconds(true));
    };
    const lightToDarkMode = () => {
      console.log('chamou lightToDarkMode');
      setPrimaryColor(primaryColor === '#30ACDD' ? '#030A0D' : '#30ACDD');
      setSecondaryColor(secondaryColor === '#288CC3' ? '#142024' : '#288CC3');
    };

    //chamar a função de acordo com o item pressionado
    switch (pressedItem) {
      case 0:
        celsiusToFahrenheit(pressedItem);
        break;
      case 1:
        metersToSeconds(pressedItem);
        break;
      case 2:
        lightToDarkMode();
        break;

      default:
        break;
    }
  };
  return changeToggleButton;
};

export const useOnHandleLocationDenied = () => {
  console.log('chamou useOnHandleLocationAccessPermission');
  Alert.alert(
    'Location Permission Denied',
    'Please Grant the Permission access.',
    [{text: 'OK', onPress: requestLocationPermission}],
    {cancelable: false},
  );
};

export const clearData = async () => {
  try {
    storage.clearAll();
    RNRestart.Restart();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export const getFahrenheit = (
  temperature: number,
  temperatureHourly: number[],
  temperatureDaily: {tempMin: number[]; tempMax: number[]},
) => {
  const valueInCelsius = (value: number) => ((value * 9) / 5 + 32).toFixed(2);
  const convertArrayToFahrenheit = (array: number[]) =>
    array.map(valueInCelsius);
  const min = Array.from(temperatureDaily.tempMin);
  const max = Array.from(temperatureDaily.tempMax);
  console.log('min = ', min, 'max = ', max);

  const celsiusToFahrenheit = valueInCelsius(temperature);
  const hourlyFahrenheit = convertArrayToFahrenheit(temperatureHourly);
  const dailyFahrenheitMin = convertArrayToFahrenheit(min);
  const dailyFahrenheitMax = convertArrayToFahrenheit(max);
  console.log('dailyFahrenheit = ', dailyFahrenheitMin, dailyFahrenheitMax);

  const convertedTemperatureDaily = {
    tempMin: dailyFahrenheitMin.map(parseFloat),
    tempMax: dailyFahrenheitMax.map(parseFloat),
  };
  console.log('convertedTemperatureDaily = ', convertedTemperatureDaily);

  return {
    celsiusToFahrenheit: parseFloat(celsiusToFahrenheit),
    hourlyFahrenheit: hourlyFahrenheit.map(parseFloat),
    temperatureDaily: convertedTemperatureDaily,
  };
};

export const getCelsius = (
  temperature: number,
  temperatureHourly: number[],
  temperatureDaily: {tempMin: number[]; tempMax: number[]},
) => {
  const valueInCelsius = (value: number) => (((value - 32) * 5) / 9).toFixed(2);
  const convertArrayToCelsius = (array: number[]) => array.map(valueInCelsius);
  const min = Array.from(temperatureDaily.tempMin);
  const max = Array.from(temperatureDaily.tempMax);
  console.log('min = ', min, 'max = ', max);

  const fahrenheitToCelsius = valueInCelsius(temperature);
  const hourlyCelsius = convertArrayToCelsius(temperatureHourly);
  const dailyCelsiusMin = convertArrayToCelsius(min);
  const dailyCelsiusMax = convertArrayToCelsius(max);
  console.log('dailyCelsius = ', dailyCelsiusMin, dailyCelsiusMax);

  const convertedTemperatureDaily = {
    tempMin: dailyCelsiusMin.map(parseFloat),
    tempMax: dailyCelsiusMax.map(parseFloat),
  };
  console.log('convertedTemperatureDaily = ', convertedTemperatureDaily);

  return {
    fahrenheitToCelsius: parseFloat(fahrenheitToCelsius),
    hourlyCelsius: hourlyCelsius.map(parseFloat),
    temperatureDaily: convertedTemperatureDaily,
  };
};

export const getMetersToSecond = (kmPerHour: number) => {
  console.log('entrou km/h = ', kmPerHour);
  const metersPerSecond = ((kmPerHour * 1000) / 3600).toFixed(2);
  const formattedValue = parseFloat(metersPerSecond);
  console.log('METERS PER SECOND = ', formattedValue);
  return formattedValue;
};

export const getKilometersToHour = (mPerSecond: number) => {
  console.log('entrou m/s = ', mPerSecond);
  const KilometersPerHour = (mPerSecond * 3.6).toFixed(2);
  const formattedValue = parseFloat(KilometersPerHour);
  console.log('KILOMETERS PER HOUR = ', formattedValue);
  return formattedValue;
};
