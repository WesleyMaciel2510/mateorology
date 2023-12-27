import React from 'react';
import Weather from '../../services/getWeather';

interface Props {
  navigation: any;
}

export default function Home(props: Props) {
  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);
  // ============================================================================
  return <Weather />;
}
