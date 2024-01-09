import {SetStateAction, useEffect, useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedView, setSelectedView] = useState('');

  return {
    searchText,
    setSearchText,
    selectedView,
    setSelectedView,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {setSearchText} = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Search!!');
  }, []);
};

export const useOnHandlePressedView = () => {
  const {setSelectedView} = useSharedState();
  const handlePress = (view: SetStateAction<string>) => {
    setSelectedView(view);
    console.log('SELECIONOU A VIEW = ', view);
  };
  return {handlePress};
};
