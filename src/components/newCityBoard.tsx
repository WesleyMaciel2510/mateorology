import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState as useSharedStateSearch} from '../screens/Search/logic';
import {useSharedState as useSharedStateUser} from '../screens/User/logic';

const NewCity = ({borderStyles, selectedBoard}) => {
  const {selectedView} = useSharedStateSearch();
  const {secondaryColor} = useSharedStateUser();

  return (
    <View
      style={[
        styles.boardArea,
        {
          backgroundColor: secondaryColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        // only shows border if it's the selected view
        selectedView === selectedBoard ? borderStyles : null,
      ]}>
      <View style={{alignContent: 'center'}}>
        <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold'}]}>
          Pesquise para {'\n'}adicionar nova cidade
        </Text>
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={styles.roundedView}>
          <LottieView
            source={require('../assets/animations/add.json')}
            style={{width: 70, height: 70}}
            loop
            autoPlay
          />
        </View>
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
  text: {
    color: 'white',
    textAlign: 'center',
  },
  roundedView: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
});

export default NewCity;
