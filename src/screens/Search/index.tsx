import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSharedState, useOnHandlePressedView} from './logic';
import {useSharedState as useSharedStateUser} from '../User/logic';
import GooglePlacesInput from '../../components/googlePlacesInput';
import NewCity from '../../components/newCityBoard';
import CityBoard from '../../components/cityBoard';

interface Props {
  navigation: any;
}

export default function Search(props: Props) {
  const {selectedView, city1, city2, city3} = useSharedState();
  const {primaryColor} = useSharedStateUser();
  const {handlePress} = useOnHandlePressedView();

  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);
  // ============================================================================
  const borderStyles = selectedView
    ? {
        borderWidth: 3,
        borderColor: 'white',
      }
    : null;
  // ============================================================================

  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <View style={[styles.container, {backgroundColor: primaryColor}]}>
        <View style={styles.titleArea}>
          <FontAwesome5
            name={'map-marker-alt'}
            size={30}
            color="#fff"
            style={[styles.iconStyle, {marginLeft: 30}]}
          />
          <Text style={styles.titleText}> Search Your City </Text>
        </View>
        <View style={styles.searchArea}>
          <GooglePlacesInput />
          <FontAwesome5
            name={'search'}
            size={30}
            color="#5f9dfa"
            style={[styles.iconStyle, {marginLeft: 10}]}
          />
        </View>
        <View>
          <Text
            style={[
              styles.text,
              {paddingVertical: 20, fontSize: 18, fontWeight: 'bold'},
            ]}>
            Search to add a new city
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={selectedView === 1 ? 1 : 0}
          onPress={() => handlePress(1)}>
          {Object.keys(city1).length === 0 ? (
            <NewCity borderStyles={borderStyles} selectedBoard={1} />
          ) : (
            <CityBoard borderStyles={borderStyles} selectedBoard={1} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={selectedView === 2 ? 1 : 0}
          onPress={() => handlePress(2)}>
          {Object.keys(city2).length === 0 ? (
            <NewCity borderStyles={borderStyles} selectedBoard={2} />
          ) : (
            <CityBoard borderStyles={borderStyles} selectedBoard={2} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={selectedView === 3 ? 1 : 0}
          onPress={() => handlePress(3)}>
          {Object.keys(city3).length === 0 ? (
            <NewCity borderStyles={borderStyles} selectedBoard={3} />
          ) : (
            <CityBoard borderStyles={borderStyles} selectedBoard={3} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  titleArea: {
    flexDirection: 'row',
    margin: 30,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 22,
    color: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  searchArea: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#5f9dfa',
    marginHorizontal: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  boardArea: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  roundedView: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  leftTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
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
    paddingVertical: 10,
  },
});
