import Geocoder from 'react-native-geocoding';

export const getCityName = async (
  positionLatitude: Geocoder.fromParams,
  positionLongitude: Geocoder.fromParams,
) => {
  try {
    // initializing with API Key
    Geocoder.init('AIzaSyAJUuqlYBMZ16g8R2nSQdS2dbisXqfKcpI', {language: 'en'});
    const cityInfo = await Geocoder.from(positionLatitude, positionLongitude);
    const cityComponent = cityInfo.results[0]?.address_components.find(
      component => component.types.includes('locality'),
    );
    // I setted two different ways of getting city's name in case the first fails
    const cityName = cityComponent
      ? cityComponent.long_name
      : cityInfo.results[0]?.address_components[3]?.short_name;
    //const cityName = cityInfo.results[0]?.address_components[3]?.short_name;
    //console.log('@openMeteo@ cityName = ', cityName);
    return cityName;
  } catch (error) {
    console.error('Error fetching city name:', error);
    return error; // Return the error for handling by the caller
  }
};
