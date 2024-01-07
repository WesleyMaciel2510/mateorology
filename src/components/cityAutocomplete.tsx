import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  const handlePress = async (data: any) => {
    try {
      // 'details' is provided when fetchDetails = true
      //console.log('NOME DA CIDADE = ', data.description);
      const cityName = data.description.split(',')[0].trim();
      console.log('NOME DA CIDADE = ', cityName);
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
