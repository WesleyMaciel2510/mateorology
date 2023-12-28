import React from 'react';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
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
          style={[styles.animationArea, {width: 100, height: 100}]}
        />
        <View style={styles.temperatureArea}>
          <Text style={[styles.text, {fontSize: 50, fontWeight: 'bold'}]}>
            30 º
          </Text>
          <Text style={[styles.text, {fontSize: 20}]}>Precipitations</Text>
          <Text style={[styles.text, {fontSize: 20}]}>
            Max.: 31º {'     '}Min.: 25º
          </Text>
        </View>
        <View style={styles.weatherBarArea}>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'cloud-showers-heavy'}
              size={20}
              color="#fff"
              style={{marginLeft: 20}}
            />
            <Text style={[styles.text, {flex: 1, fontSize: 20}]}>6%</Text>

            <FontAwesome5 name={'tint'} size={20} color="#fff" />
            <Text style={[styles.text, {flex: 1, fontSize: 20}]}> 90%</Text>

            <FontAwesome5 name={'wind'} size={20} color="#fff" />
            <Text style={[styles.text, {flex: 1, fontSize: 20}]}> 19 km/h</Text>
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
                  Dec, 28
                </Text>
              </View>
            </View>
            <View style={styles.columnView}>
              <View style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 20}]}> 29º C</Text>
                <LottieView
                  source={require('../../assets/animations/sun.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 20},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  15:00
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 20}]}>26º C</Text>
                <LottieView
                  source={require('../../assets/animations/cloudy.json')}
                  style={[styles.animationArea, {width: 50, height: 50}]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  16:00
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 20}]}> 24º C</Text>
                <LottieView
                  source={require('../../assets/animations/cloud.json')}
                  style={[styles.animationArea, {width: 50, height: 50}]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  17:00
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.text, {fontSize: 20}]}>23º C</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[styles.animationArea, {width: 50, height: 50}]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  18:00
                </Text>
              </View>
            </View>
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
                <Text style={[styles.text, {fontSize: 20}]}> Monday</Text>
                <LottieView
                  source={require('../../assets/animations/thunder-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 20},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  {'10º     13º'}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> Tuesday</Text>
                <LottieView
                  source={require('../../assets/animations/sun-rain.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 20},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  {'12º     17º'}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={[styles.text, {fontSize: 20}]}> Wednesday</Text>
                <LottieView
                  source={require('../../assets/animations/cloudy.json')}
                  style={[
                    styles.animationArea,
                    {width: 50, height: 50, margin: 20},
                  ]}
                />
                <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                  {'15º     19º'}
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
    //flex: 1,
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
