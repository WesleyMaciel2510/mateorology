import React from 'react';
import {View, Text, ScrollView, StatusBar, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/index';
import {useSharedState} from '../User/logic';

interface Props {
  navigation: any;
}

type BottomIconsNavigationProp = NavigationProp<RootStackParamList>;

export default function Policy(props: Props) {
  const navigation = useNavigation<BottomIconsNavigationProp>();
  const {primaryColor} = useSharedState();
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
      <ScrollView style={[styles.container, {backgroundColor: primaryColor}]}>
        <View style={styles.titleArea}>
          <FontAwesome5
            name={'lock'}
            size={30}
            color="#fff"
            style={[styles.iconStyle, {marginLeft: 30}]}
          />
          <Text style={[styles.titleText, {fontWeight: 'bold', color: '#fff'}]}>
            Policy Privacy
          </Text>
        </View>
        <View style={{borderWidth: 1, borderColor: '#fff', width: '100%'}} />

        {/* Subtopic 1: Location Information */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>1. Location Information</Text>
          <Text style={styles.subtopicText}>
            Matereology may collect and store your device's location information
            to provide you with accurate weather data based on your current
            location.
          </Text>
        </View>

        {/* Subtopic 2: Weather Data */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>2. Weather Data</Text>
          <Text style={styles.subtopicText}>
            We retrieve weather information from a third-party API to offer you
            real-time updates. This may include current weather conditions,
            forecasts, and related data.
          </Text>
        </View>

        {/* Subtopic 3: Personalization */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>3. Personalization</Text>
          <Text style={styles.subtopicText}>
            We use your location information to personalize the weather data
            displayed within the app, providing you with relevant and accurate
            information.
          </Text>
        </View>

        {/* Subtopic 4: Service Improvement */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>4. Service Improvement</Text>
          <Text style={styles.subtopicText}>
            Collected data helps us improve and optimize the performance,
            features, and content of Matereology.
          </Text>
        </View>

        {/* Subtopic 5: Data Sharing */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>5. Data Sharing</Text>
          <Text style={styles.subtopicText}>
            We may share anonymized and aggregated data with third-party
            services for analytics and improvement purposes. However, we do not
            share personally identifiable information with third parties without
            your consent.
          </Text>
        </View>

        {/* Subtopic 6: Security */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>6. Security</Text>
          <Text style={styles.subtopicText}>
            We take reasonable measures to protect the information collected
            from unauthorized access, disclosure, alteration, or destruction.
          </Text>
        </View>

        {/* Subtopic 7: Consent */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>7. Consent</Text>
          <Text style={styles.subtopicText}>
            By using Matereology, you consent to the collection and use of
            information as outlined in this Privacy Policy.
          </Text>
        </View>

        {/* Subtopic 8: Opt-Out */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>8. Opt-Out</Text>
          <Text style={styles.subtopicText}>
            You can opt-out of location tracking by adjusting your device's
            location settings. However, please note that this may affect the
            app's functionality.
          </Text>
        </View>
        <View>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
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
  subtopicContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
  },

  subtopicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  subtopicText: {
    fontSize: 16,
    color: '#fff',
  },
});
