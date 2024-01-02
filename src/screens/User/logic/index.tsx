import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [toggleButton, setToggleButton] = useState([true, true, true]);
  return {toggleButton, setToggleButton};
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
  const {toggleButton, setToggleButton} = useSharedState();
  const changeToggleButton = (pressedItem: number) => {
    console.log('pressed Item = ', pressedItem);
    setToggleButton(prevState => {
      prevState[pressedItem] = !toggleButton[pressedItem];
      return [...prevState];
    });
    const celsiusToFahrenheit = (pressedItem: number) => {
      console.log('chamou celsiusToFahrenheit');
      toggleButton[pressedItem] === true
        ? console.log('toggleButton ON')
        : console.log('toggleButton OFF');
    };
    const metersToSeconds = (pressedItem: number) => {
      console.log('chamou metersToSeconds');
      toggleButton[pressedItem] === true
        ? console.log('toggleButton ON')
        : console.log('toggleButton OFF');
    };
    const lightToDarkMode = (pressedItem: number) => {
      console.log('chamou lightToDarkMode');
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
        lightToDarkMode(pressedItem);
        break;

      default:
        break;
    }
  };
  return changeToggleButton;
};
