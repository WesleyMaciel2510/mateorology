import React from 'react';
import {View, Text, StatusBar, ScrollView, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  navigation: any;
}

export default function User(props: Props) {
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
            <Text style={{color: '#fff', fontSize: 30}}> Metrics </Text>
          </View>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'thermometer-three-quarters'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Celsius </Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'toggle-on'}
                size={40}
                color="#fff"
                style={styles.iconStyle}
              />
            </View>
          </View>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'wind'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}>
              Meters/Seconds {/* Miles Per Hour */}
            </Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'toggle-on'}
                size={38}
                color="#fff"
                style={styles.iconStyle}
              />
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 30}}> Customization </Text>
          </View>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'adjust'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Light Mode </Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'toggle-on'}
                size={40}
                color="#fff"
                style={styles.iconStyle}
              />
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 30}}> Location </Text>
          </View>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'globe'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Location Access</Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'chevron-right'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
            </View>
          </View>
          <View style={styles.simpleBar}>
            <FontAwesome5
              name={'thumbtack'}
              size={30}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.text}> Default Location </Text>
            <View style={styles.alignRightView}>
              <FontAwesome5
                name={'chevron-right'}
                size={30}
                color="#fff"
                style={styles.iconStyle}
              />
            </View>
          </View>
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 30}}> Data Source </Text>
          </View>
          <View style={styles.simpleBar}>
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
          <View style={styles.simpleBar}>
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
          <View style={{marginVertical: 25}}>
            <Text style={{color: '#fff', fontSize: 30}}> Privacy </Text>
          </View>
          <View style={styles.simpleBar}>
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
          <View style={styles.simpleBar}>
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
    backgroundColor: '#30acdd',
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
    fontSize: 25,
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
    paddingHorizontal: 30,
  },
  alignRightView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
