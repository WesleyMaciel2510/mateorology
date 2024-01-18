import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../screens/Home/logic';
import {getAnimationName} from '../assets/animations/getAnimationName';

const TodayColumn = ({index}) => {
  const {temperatureHourly, hour, weatherCodeHourly} = useSharedState();
  // =================================================================
  // if 'futureData' is false, animation gets the currentTime,
  // else it gets the hour that it needs to set day-night
  //code, futureData, hours
  const animationURL = getAnimationName(
    weatherCodeHourly[index],
    hour[index],
    true,
  );
  //console.log('COLUMN CODE = ', weatherCodeHourly[index]);
  //console.log('animationURL = ', animationURL);
  // =================================================================
  return (
    <View style={styles.columnView}>
      <View>
        <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
          {temperatureHourly[index]}º
        </Text>
        <LottieView
          source={animationURL}
          autoPlay
          loop
          style={[styles.animationArea, {width: 50, height: 50, margin: 12}]}
        />
        <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
          {hour[index]}:00
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default TodayColumn;
