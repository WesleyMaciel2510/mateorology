import {useEffect, useState} from 'react';
import {Linking, Alert} from 'react-native';
import {useBetween} from 'use-between';
import {requestLocationPermission} from '../../../services/askPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

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
  const changeToggleButton = (pressedItem: number) => {
    console.log('pressed Item = ', pressedItem);
    setToggleButton(prevState => {
      prevState[pressedItem] = !toggleButton[pressedItem];
      return [...prevState];
    });
    const celsiusToFahrenheit = (pressedItem: number) => {
      console.log('chamou celsiusToFahrenheit');
      toggleButton[pressedItem] === true
        ? (console.log('toggleButton ON '), setFahrenheit(false))
        : (console.log('toggleButton OFF '), setFahrenheit(true));
    };
    const metersToSeconds = (pressedItem: number) => {
      console.log('chamou metersToSeconds');
      toggleButton[pressedItem] === true
        ? (console.log('toggleButton ON = '), setMetersToSeconds(false))
        : (console.log('toggleButton OFF = '), setMetersToSeconds(true));
    };
    const lightToDarkMode = () => {
      console.log('chamou lightToDarkMode');
      setPrimaryColor(primaryColor === '#30ACDD' ? '#030A0D' : '#30ACDD');
      setSecondaryColor(secondaryColor === '#288CC3' ? '#142024' : '#288CC3');

      //setSecondaryColor('#0F1C21');
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
    // Clear AsyncStorage data
    await AsyncStorage.clear();
    RNRestart.Restart();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
