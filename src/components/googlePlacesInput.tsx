import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import fetchNewCityData from '../services/openMeteo/searchNewCity';
import {useSharedState as useSharedStateSearch} from '../screens/Search/logic';

const GooglePlacesInput = () => {
  const {selectedView, setCity1, setCity2, setCity3} = useSharedStateSearch();
  Geocoder.init('AIzaSyAJUuqlYBMZ16g8R2nSQdS2dbisXqfKcpI', {language: 'en'});
  const handlePress = async (data: any) => {
    const cityName = data.description.split(',')[0].trim();
    //console.log(' cityName = ', cityName);

    try {
      const geocoderResult = await Geocoder.from(cityName);
      const location = geocoderResult.results[0].geometry.location;
      const latitude = location.lat.toFixed(2);
      const longitude = location.lng.toFixed(2);

      //console.log('latitude = ', latitude, 'longitude = ', longitude);
      try {
        const cityData = await fetchNewCityData(latitude, longitude);
        //console.log('RESULTADO DA BUSCA DE NOVA CIDADE ==== ', cityData);
        //console.log('selectedView = ', selectedView);

        const info = {
          cityName: data.description.split(',')[0].trim(),
          currentTemp: cityData.current.temperature2m.toString().slice(0, 2),
          minTemp: cityData.daily.temperature2mMin.toString().slice(0, 2),
          maxTemp: cityData.daily.temperature2mMax.toString().slice(0, 2),
          humidity: cityData.current.relativeHumidity2m,
          code: cityData.current.weatherCode,
        };
        switch (selectedView) {
          case 1:
            //console.log('ARMAZENAR NA 1');
            setCity1(info);
            break;

          case 2:
            //console.log('ARMAZENAR NA 2');
            setCity2(info);
            //console.log('CODE = ', info.code);
            break;

          case 3:
            //console.log('ARMAZENAR NA 3');
            setCity3(info);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error getting fetchNewCityData data: ', error);
      }
    } catch (error) {
      console.warn('Error getting location data: ', error);
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
