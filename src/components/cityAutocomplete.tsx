import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {useSharedState} from '../screens/User/logic';

const GooglePlacesInput = () => {
  const {} = useSharedState();
  Geocoder.init('AIzaSyAJUuqlYBMZ16g8R2nSQdS2dbisXqfKcpI', {language: 'en'});
  const handlePress = async (data: any) => {
    try {
      //trim to take only the city name
      const cityName = data.description.split(',')[0].trim();
      console.log('NOME DA CIDADE = ', cityName);
      // now that we have the city name, we can get the latlong
      Geocoder.from(cityName)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log('RESULTADO DA BUSCA ======== ', location);
        })
        .catch(error => console.warn('Error getting location data: ', error));
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      styles={{
        textInput: {
          height: 38,
          color: '#000',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#000',
          fontSize: 16,
          height: 38,
        },
        description: {
          color: '#000',
          fontSize: 16,
        },
        row: {
          backgroundColor: 'white',
          padding: 13,
          height: 44,
          flexDirection: 'row',
        },
      }}
      onPress={handlePress}
      query={{
        key: 'AIzaSyAJUuqlYBMZ16g8R2nSQdS2dbisXqfKcpI',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
