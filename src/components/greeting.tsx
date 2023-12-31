import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GreetingComponent = () => {
  const [greeting, setGreeting] = useState('');

  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  useEffect(() => {
    const userGreeting = getGreeting();
    setGreeting(userGreeting);
  }, []);

  return (
    <View>
      <Text style={styles.titleText}>{greeting}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginLeft: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default GreetingComponent;
