import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/index';
import {
  useSharedState,
  useOnHandlePress,
  useOnToggleButtonPress,
} from './logic';
import {useSharedState as useSharedStateHome} from '../Home/logic';
import {requestLocationPermission} from '../../services/askPermission';

interface Props {
  navigation: any;
}

type BottomIconsNavigationProp = NavigationProp<RootStackParamList>;

export default function User(props: Props) {
  const navigation = useNavigation<BottomIconsNavigationProp>();

  const {toggleButton, primaryColor, secondaryColor, tempUnit, windSpeedUnit} =
    useSharedState();
  const {locationPermission, cityName} = useSharedStateHome();

  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);

  // Declaring hooks
  const handlePress = useOnHandlePress();
  const toggleButtonPress = useOnToggleButtonPress();
  //const handleLocation = useOnHandleLocationDenied();
  // ============================================================================
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView style={[styles.container, {backgroundColor: primaryColor}]}>
        <View style={styles.titleArea}>
          <FontAwesome5
            name={'user'}
            size={30}
            color="#fff"
            style={[styles.iconStyle, {marginLeft: 30}]}
          />
          <Text style={styles.titleText}> User Preferences </Text>
        </View>
        <View style={{borderWidth: 1, borderColor: '#fff', width: '100%'}} />
        <View style={styles.contentArea}>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 22}}> Metrics </Text>
          </View>
          <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
            <FontAwesome5
              name={'thermometer-three-quarters'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> {tempUnit} </Text>
            <View style={styles.alignRightView}>
              <TouchableOpacity onPress={() => toggleButtonPress(0)}>
                <FontAwesome5
                  name={toggleButton[0] === true ? 'toggle-on' : 'toggle-off'}
                  size={40}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
            <FontAwesome5
              name={'wind'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}>{windSpeedUnit}</Text>
            <View style={styles.alignRightView}>
              <TouchableOpacity onPress={() => toggleButtonPress(1)}>
                <FontAwesome5
                  name={toggleButton[1] === true ? 'toggle-on' : 'toggle-off'}
                  size={38}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 22}}> Customization </Text>
          </View>
          <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
            <FontAwesome5
              name={'adjust'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Light Mode </Text>
            <View style={styles.alignRightView}>
              <TouchableOpacity onPress={() => toggleButtonPress(2)}>
                <FontAwesome5
                  name={toggleButton[2] === true ? 'toggle-on' : 'toggle-off'}
                  size={40}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 22}}> Location </Text>
          </View>
          <TouchableOpacity
            onPress={locationPermission ? null : requestLocationPermission}
            activeOpacity={locationPermission ? 0.01 : 1}>
            <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
              <FontAwesome5
                name={'globe'}
                size={30}
                color={locationPermission ? '#75F900' : '#fff'}
                style={styles.iconStyle}
              />
              <Text style={styles.text}> Location Access</Text>
              <View style={styles.alignRightView}>
                <FontAwesome5
                  name={locationPermission ? 'check-square' : 'chevron-right'}
                  size={30}
                  color={locationPermission ? '#75F900' : '#fff'}
                  style={styles.iconStyle}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
            <FontAwesome5
              name={'thumbtack'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={[styles.text, {fontSize: 18}]}>
                Default Location:
              </Text>
            </View>

            <View style={styles.alignRightView}>
              <Text style={[styles.text, {fontSize: 18, bottom: 3}]}>
                {cityName}
              </Text>
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 22}}> Data Source </Text>
          </View>
          <TouchableOpacity onPress={() => handlePress(1)}>
            <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
              <FontAwesome5
                name={'cloud-moon-rain'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
              <Text style={styles.text}> Open Weather Map </Text>
              <View style={styles.alignRightView}>
                <FontAwesome5
                  name={'chevron-right'}
                  size={30}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress(2)}>
            <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
              <FontAwesome5
                name={'cloud-sun'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
              <Text style={styles.text}> Open Meteo</Text>
              <View style={styles.alignRightView}>
                <FontAwesome5
                  name={'chevron-right'}
                  size={30}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 22}}> Privacy </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
            <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
              <FontAwesome5
                name={'shield-alt'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
              <Text style={styles.text}> Privacy Policy </Text>
              <View style={styles.alignRightView}>
                <FontAwesome5
                  name={'chevron-right'}
                  size={30}
                  color="#fff"
                  style={styles.iconStyle}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.simpleBar, {backgroundColor: secondaryColor}]}>
            <FontAwesome5
              name={'database'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Clear all Data </Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'sign-out-alt'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
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
  contentArea: {
    paddingHorizontal: 30,
  },
  titleArea: {
    flexDirection: 'row',
    margin: 30,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 22,
    color: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    fontSize: 20,
  },
  iconStyle: {
    marginHorizontal: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  simpleBar: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  alignRightView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});
