import {SetStateAction, useEffect, useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [selectedView, setSelectedView] = useState(1);
  const [city1, setCity1] = useState({});
  const [city2, setCity2] = useState({});
  const [city3, setCity3] = useState({});

  return {
    selectedView,
    setSelectedView,
    city1,
    setCity1,
    city2,
    setCity2,
    city3,
    setCity3,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  useEffect(() => {
    console.log('useInit funcionando em Search!!');
  }, []);
};

export const useOnHandlePressedView = () => {
  const {setSelectedView} = useSharedState();
  const handlePress = (view: SetStateAction<number>) => {
    setSelectedView(view);
  };
  return {handlePress};
};
