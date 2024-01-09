import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSharedState as useSharedStateHome} from '../screens/Home/logic';
import {useSharedState as useSharedStateSearch} from '../screens/Search/logic';
import {useSharedState as useSharedStateUser} from '../screens/User/logic';

const CityBoard = ({borderStyles, selectedBoard}) => {
  const {cityName, humidity, temperature} = useSharedStateHome();
  const {selectedView} = useSharedStateSearch();
  const {secondaryColor} = useSharedStateUser();

  return (
    <View
      style={[
        styles.boardArea,
        {backgroundColor: secondaryColor},
        // only shows border if it's the selected view
        selectedView === selectedBoard ? borderStyles : null,
      ]}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={[styles.leftTextContainer]}>
          <Text style={[styles.text, {fontSize: 22, fontWeight: 'bold'}]}>
            {cityName}
          </Text>
          <View style={styles.line}>
            <FontAwesome5
              name={'thermometer-three-quarters'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
              {temperature[0]}º C
            </Text>
            <FontAwesome5
              name={'tint'}
              size={30}
              color="#fff"
              style={{paddingHorizontal: 15}}
            />
            <Text style={[styles.text, {fontSize: 20}]}>{humidity}%</Text>
          </View>
          <Text
            style={[
              styles.text,
              {fontSize: 20, fontWeight: 'bold', paddingTop: 10},
            ]}>
            Min.: {temperature[1]} {'  '} Max.: {temperature[2]}
          </Text>
        </View>
        <LottieView
          source={require('../assets/animations/cloud-rain.json')}
          style={{width: 100, height: 100}}
          loop
          autoPlay
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardArea: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leftTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default CityBoard;
