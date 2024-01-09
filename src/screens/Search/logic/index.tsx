import {SetStateAction, useEffect, useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [selectedView, setSelectedView] = useState(0);
  const [cityInfo, setCityInfo] = useState([{}]);

  return {
    selectedView,
    setSelectedView,
    cityInfo,
    setCityInfo,
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
    console.log('SELECIONOU A VIEW = ', view);
  };
  return {handlePress};
};
