/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startListeners} from './src/listeners/index';

// Initialize listeners when the app starts
//startListeners();

AppRegistry.registerComponent(appName, () => App);
