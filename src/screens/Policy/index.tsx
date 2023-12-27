import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  navigation: any;
}

export default function Policy(props: Props) {
  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);
  // ============================================================================

  return (
    <View>
      <Text>Policy Screen</Text>
    </View>
  );
}
