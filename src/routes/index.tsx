import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import User from '../screens/User';
import NextForecast from '../screens/NextForecast';
import Policy from '../screens/Policy';

// Define the RootStackParamList directly in the Routes file
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  User: undefined;
  Settings: undefined;
  Policy: undefined;
};
// Why 'undefined'?
//In TypeScript, when defining a navigation parameter type for a screen, you often use undefined as the type for the parameters that the screen doesn't expect. The undefined type indicates that the screen doesn't receive any additional parameters when navigating to it.

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="NextForecast" component={NextForecast} />
      <Stack.Screen name="Policy" component={Policy} />
    </Stack.Navigator>
  );
};

export default AppStack;
