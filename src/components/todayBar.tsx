import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const TodayBar = () => {
  return (
    <View style={styles.todayArea}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={styles.leftTextContainer}>
          <Text style={[styles.text, {fontSize: 20}]}>Today</Text>
        </View>
        <View style={styles.rightTextContainer}>
          <Text style={[styles.text, {fontSize: 20}]}>Dec, 28</Text>
        </View>
      </View>
      <View style={styles.columnView}>
        <View style={styles.column}>
          <Text style={[styles.text, {fontSize: 20}]}> 29º C</Text>
          <LottieView
            source={require('../assets/animations/sun.json')}
            style={[styles.animationArea, {width: 50, height: 50, margin: 20}]}
          />
          <Text style={[styles.text, {fontSize: 20, margin: 10}]}>15:00</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.text, {fontSize: 20}]}>26º C</Text>
          <LottieView
            source={require('../assets/animations/cloudy.json')}
            style={[styles.animationArea, {width: 50, height: 50}]}
          />
          <Text style={[styles.text, {fontSize: 20, margin: 10}]}>16:00</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.text, {fontSize: 20}]}> 24º C</Text>
          <LottieView
            source={require('../assets/animations/cloud.json')}
            style={[styles.animationArea, {width: 50, height: 50}]}
          />
          <Text style={[styles.text, {fontSize: 20, margin: 10}]}>17:00</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.text, {fontSize: 20}]}>23º C</Text>
          <LottieView
            source={require('../assets/animations/thunder-rain.json')}
            style={[styles.animationArea, {width: 50, height: 50}]}
          />
          <Text style={[styles.text, {fontSize: 20, margin: 10}]}>18:00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todayArea: {
    flex: 2,
    padding: 15,
    backgroundColor: '#288cc3',
    borderRadius: 15,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leftTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  columnView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  column: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default TodayBar;
