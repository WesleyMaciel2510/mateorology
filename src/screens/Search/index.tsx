import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedStateUser} from '../User/logic';
import GooglePlacesInput from '../../components/cityAutocomplete';

interface Props {
  navigation: any;
}

export default function Search(props: Props) {
  const {searchText, setSearchText} = useSharedState();
  const {primaryColor, secondaryColor} = useSharedStateUser();

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
          <TouchableOpacity /* onPress={} */>
            <FontAwesome5
              name={'search'}
              size={30}
              color="#5f9dfa"
              style={[styles.iconStyle, {marginLeft: 10}]}
            />
          </TouchableOpacity>
          {/* <TextInput
            style={styles.input}
            placeholder="Select Your City Here"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={'#5f9dfa'}
            color={'#000'}
          />*/}
        </View>
        <View style={[styles.boardArea, {backgroundColor: secondaryColor}]}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={styles.leftTextContainer}>
              <Text style={[styles.text, {fontSize: 30, fontWeight: 'bold'}]}>
                Uberaba
              </Text>
              <View style={styles.line}>
                <FontAwesome5
                  name={'thermometer-three-quarters'}
                  size={30}
                  color="#fff"
                  style={styles.iconStyle}
                />
                <Text style={[styles.text, {fontSize: 30, fontWeight: 'bold'}]}>
                  29º C
                </Text>
                <FontAwesome5
                  name={'tint'}
                  size={30}
                  color="#fff"
                  style={{paddingHorizontal: 15}}
                />
                <Text style={[styles.text, {fontSize: 30}]}> 90%</Text>
              </View>
              <Text
                style={[
                  styles.text,
                  {fontSize: 20, fontWeight: 'bold', paddingTop: 10},
                ]}>
                Min.: 24 {'    '} Max.: 31
              </Text>
            </View>
            <View>
              <LottieView
                source={require('../../assets/animations/cloud-rain.json')}
                style={{width: 100, height: 100}}
                loop
                autoPlay
              />
            </View>
          </View>
        </View>
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
    fontSize: 25,
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
    //flex: 1,
    padding: 15,
    borderRadius: 20,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 50,
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
