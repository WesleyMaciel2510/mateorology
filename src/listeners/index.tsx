import {gpsListener} from './gpsListener';
import {internetListener} from './internetListener';

export const startListeners = () => {
  gpsListener();
  internetListener();
};
