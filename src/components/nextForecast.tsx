import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../screens/Home/logic';
import {getAnimationName} from '../assets/animations/getAnimationName';

const NextForecast = ({index}) => {
  const {week, forecastTemperature, weatherCodeDaily} = useSharedState();
  // ===========================================================================
  const animationURL = getAnimationName(weatherCodeDaily[index], null, false);

  // ===========================================================================

  return (
    <View style={styles.line}>
      <Text style={styles.text}> {week[index]}</Text>
      <LottieView
        source={animationURL}
        style={styles.animationArea}
        loop
        autoPlay
      />
      <Text style={styles.text}>
        {forecastTemperature.tempMin[index]}º{' '}
        {forecastTemperature.tempMax[index]}º
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
    width: 50,
    height: 50,
    margin: 10,
    paddingLeft: 10,
  },
});

export default NextForecast;
