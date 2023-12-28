import React from 'react';
import Weather from '../../services/getWeather';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';

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
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.titleArea}>
            <FontAwesome5
              name={'map-marker-alt'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.titleText}> Uberaba </Text>
            <FontAwesome5
              name={'chevron-down'}
              size={20}
              color="#fff"
              style={[styles.iconStyle, {marginTop: 15}]}
            />
          </View>
        </View>
        <LottieView
          source={require('../../assets/animations/cloudy.json')}
          autoPlay
          loop
          style={styles.animationArea}
        />
        <View style={styles.temperatureArea}></View>
        <View style={styles.weatherBarArea}></View>
        <View style={styles.todayArea}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#30acdd',
  },
  titleArea: {
    flexDirection: 'row',
    margin: 50,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  animationArea: {
    flex: 1,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  temperatureArea: {
    flex: 2,
  },
  weatherBarArea: {
    flex: 1,
  },
  todayArea: {
    flex: 2,
  },
});
