import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../screens/Home/logic';
import {getAnimationName} from '../assets/animations/getAnimationName';

const TodayColumn = ({index}) => {
  const {temperatureHourly, nextHours, weatherCodeHourly} = useSharedState();
  // =================================================================
  // if 'futureData' is false, animation gets the currentTime,
  // else it gets the hour that it needs to set day-night
  //code, futureData, nextHours
  const animationURL = getAnimationName(
    weatherCodeHourly[index],
    nextHours[index],
    true,
  );
  //console.log('COLUMN CODE = ', weatherCodeHourly[index]);
  //console.log('animationURL = ', animationURL);
  // =================================================================
  return (
    <View style={styles.columnView}>
      <View>
        <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
          {temperatureHourly[index]}º C
        </Text>
        <LottieView
          source={animationURL}
          autoPlay
          loop
          style={[styles.animationArea, {width: 50, height: 50, margin: 12}]}
        />
        <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
          {nextHours[index]}:00
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
