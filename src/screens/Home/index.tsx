import React from 'react';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useInit, useSharedState} from './logic';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import GreetingComponent from '../../components/greeting';

interface Props {
  navigation: any;
}

export default function Home(props: Props) {
  const {
    humidity,
    precipitation,
    temperature,
    windSpeed,
    date,
    temperatureHourly,
    nextFourHours,
    week,
    forecastTemperature,
    position,
  } = useSharedState();
  useInit();
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
        <GreetingComponent />
        <LottieView
          source={require('../../assets/animations/night-cloud.json')}
          autoPlay
          loop
          style={[styles.animationArea, {width: 150, height: 150}]}
        />
        <View style={styles.temperatureArea}>
          <Text style={[styles.text, {fontSize: 50, fontWeight: 'bold'}]}>
            {temperature[0]}º
          </Text>
          <Text style={[styles.text, {fontSize: 20}]}>
            Min.: {temperature[1]}º {'     '}Max.: {temperature[2]}º
          </Text>
          <Text style={[styles.text, {fontSize: 20}]}>Precipitations</Text>
          {/* {console.log(
            'POSITION = ',
            position.coords.altitude,
            position.coords.longitude,
          )} */}
        </View>
        <View style={styles.weatherBarArea}>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'cloud-showers-heavy'}
              size={20}
              color="#fff"
              style={{marginLeft: 20}}
            />
            <Text style={[styles.text, {paddingHorizontal: 10, fontSize: 20}]}>
              {precipitation} %
            </Text>

            <FontAwesome5 name={'tint'} size={20} color="#fff" />
            <Text style={[styles.text, {paddingHorizontal: 10, fontSize: 20}]}>
              {humidity} %
            </Text>

            <FontAwesome5 name={'wind'} size={20} color="#fff" />
            <Text style={[styles.text, {paddingHorizontal: 10, fontSize: 20}]}>
              {windSpeed} km/h
            </Text>
          </View>
          <View style={styles.boardArea}>
            <View style={{flexDirection: 'row', padding: 10}}>
              <View style={styles.leftTextContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
                  Today
                </Text>
              </View>
              <View style={styles.rightTextContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
                  {date[0]}, {date[1]}
                </Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.columnView}>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[0]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/sun.json')}
                    autoPlay
                    loop
                    style={[
                      styles.animationArea,
                      {width: 50, height: 50, margin: 20},
                    ]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[0]}:00
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[1]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/cloudy.json')}
                    autoPlay
                    loop
                    style={[styles.animationArea, {width: 50, height: 50}]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[1]}:00
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[2]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/cloud.json')}
                    autoPlay
                    loop
                    style={[styles.animationArea, {width: 50, height: 50}]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[2]}:00
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[3]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/thunder-rain.json')}
                    autoPlay
                    loop
                    style={[styles.animationArea, {width: 50, height: 50}]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[3]}:00
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[4]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/thunder-rain.json')}
                    autoPlay
                    loop
                    style={[styles.animationArea, {width: 50, height: 50}]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[3]}:00
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text, {fontSize: 20}]}>
                    {temperatureHourly[3]}º C
                  </Text>
                  <LottieView
                    source={require('../../assets/animations/thunder-rain.json')}
                    autoPlay
                    loop
                    style={[styles.animationArea, {width: 50, height: 50}]}
                  />
                  <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                    {nextFourHours[3]}:00
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.boardArea}>
            <View style={{flexDirection: 'row', padding: 10}}>
              <View style={styles.leftTextContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
                  Next Forecast
                </Text>
              </View>
              <View style={styles.rightTextContainer}>
                <FontAwesome5
                  name={'calendar-week'}
                  size={30}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </View>
            </View>
            <View style={styles.rowView}>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[0]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[0]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[0]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[1]}</Text>
                <LottieView
                  source={require('../../assets/animations/sun-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[1]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[1]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[2]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10, paddingLeft: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[2]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[2]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[3]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[3]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[3]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[4]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[4]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[4]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[5]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[5]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[5]}
                  {'º  '}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> {week[6]}</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 10},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20}]}>
                  {forecastTemperature.temperature2mMin[6]}
                  {'º  '}
                  {forecastTemperature.temperature2mMax[6]}
                  {'º  '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
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
  text: {
    color: 'white',
    textAlign: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  animationArea: {
    flex: 1,
    alignSelf: 'center',
  },
  temperatureArea: {
    flex: 2,
  },
  weatherBarArea: {
    flex: 1,
    padding: 30,
  },
  simpleBar: {
    flexDirection: 'row',
    backgroundColor: '#288cc3',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  boardArea: {
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
  rowView: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
