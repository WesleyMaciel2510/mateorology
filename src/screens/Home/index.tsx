import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useInit, useSharedState} from './logic';
import {useSharedState as useSharedStateUser} from '../User/logic';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import GreetingComponent from '../../components/greeting';
import {getAnimationName} from '../../assets/animations/getAnimationName';
import TodayColumn from '../../components/todayColumn';
import NextForecast from '../../components/nextForecast';

interface Props {
  navigation: any;
}

export default function Home(props: Props) {
  const {
    cityName,
    description,
    humidity,
    rain,
    temperature,
    forecastTemperature,
    windSpeed,
    date,
    weatherCode,
  } = useSharedState();
  const {primaryColor, secondaryColor} = useSharedStateUser();
  useInit();
  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);
  // ============================================================================
  const animationURL = getAnimationName(weatherCode, null, false);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  //console.log('currentHour = ', currentHour);

  const {width} = Dimensions.get('window');
  const startPosition = currentHour * (width < 400 ? 75 : 77);

  // ============================================================================
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView style={[styles.container, {backgroundColor: primaryColor}]}>
        <View style={styles.titleArea}>
          <FontAwesome5
            name={'map-marker-alt'}
            size={30}
            color="#fff"
            style={styles.iconStyle}
          />
          <Text style={styles.titleText}> {cityName} </Text>
        </View>
        <GreetingComponent />
        <TouchableOpacity onPress={() => console.log('LALALA')}>
          <LottieView
            source={animationURL}
            autoPlay
            loop
            style={[styles.animationArea, {width: 150, height: 150}]}
          />
        </TouchableOpacity>
        <View style={styles.temperatureArea}>
          <Text style={[styles.text, {fontSize: 50, fontWeight: 'bold'}]}>
            {temperature}º
          </Text>
          <Text style={[styles.text, {fontSize: 23}]}>
            Min.: {forecastTemperature.tempMin[0]}º Max.:{' '}
            {forecastTemperature.tempMax[0]}º
          </Text>
          <Text style={[styles.text, {fontSize: 23}]}>{description}</Text>
        </View>
        <View style={styles.weatherBarArea}>
          <View
            style={[
              styles.simpleBar,
              {backgroundColor: secondaryColor, flexDirection: 'row'},
            ]}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5
                name={'cloud-showers-heavy'}
                size={20}
                color="#fff"
                style={{marginLeft: 10}}
              />
              <Text style={[styles.text, {fontSize: 20, marginLeft: 5}]}>
                {rain} %
              </Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'tint'} size={20} color="#fff" />
              <Text style={[styles.text, {fontSize: 20, marginLeft: 5}]}>
                {humidity} %
              </Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'wind'} size={20} color="#fff" />
              <Text style={[styles.text, {fontSize: 20, marginLeft: 5}]}>
                {windSpeed} km/h
              </Text>
            </View>
          </View>

          <View style={[styles.boardArea, {backgroundColor: secondaryColor}]}>
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
            <ScrollView
              horizontal
              contentOffset={{x: startPosition, y: 0}}
              showsHorizontalScrollIndicator={false}>
              <TodayColumn index={0} />
              <TodayColumn index={1} />
              <TodayColumn index={2} />
              <TodayColumn index={3} />
              <TodayColumn index={4} />
              <TodayColumn index={5} />
              <TodayColumn index={6} />
              <TodayColumn index={7} />
              <TodayColumn index={8} />
              <TodayColumn index={9} />
              <TodayColumn index={10} />
              <TodayColumn index={11} />
              <TodayColumn index={12} />
              <TodayColumn index={13} />
              <TodayColumn index={14} />
              <TodayColumn index={15} />
              <TodayColumn index={16} />
              <TodayColumn index={17} />
              <TodayColumn index={18} />
              <TodayColumn index={19} />
              <TodayColumn index={20} />
              <TodayColumn index={21} />
              <TodayColumn index={22} />
              <TodayColumn index={23} />
            </ScrollView>
          </View>
          <View style={[styles.boardArea, {backgroundColor: secondaryColor}]}>
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
              <NextForecast index={0} />
              <NextForecast index={1} />
              <NextForecast index={2} />
              <NextForecast index={3} />
              <NextForecast index={4} />
              <NextForecast index={5} />
              <NextForecast index={6} />
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
  },
  titleArea: {
    flexDirection: 'row',
    margin: 30,
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
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  boardArea: {
    flex: 2,
    padding: 15,
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
