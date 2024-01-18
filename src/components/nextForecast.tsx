import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../screens/Home/logic';
import {getAnimationName} from '../assets/animations/getAnimationName';

const NextForecast = ({index}) => {
  const {week, temperatureDaily, weatherCodeDaily} = useSharedState();
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{temperatureDaily.tempMin[index]}º </Text>
        <Text style={styles.text}>{temperatureDaily.tempMax[index]}º</Text>
      </View>
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
    fontSize: 18,
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
