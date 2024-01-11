import {animation} from '../animations/index';

// @This function is responsable for setting the Weather Animation in the Screen
export const getAnimationName = (code: number) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const isNight = currentHour > 6 && currentHour < 18 ? false : true;

  let animationName = '';

  if (code === 0) {
    animationName = isNight ? animation.night : animation.sun;
  } else if (code > 0 && code < 4) {
    animationName = isNight ? animation.nightCloud : animation.sunCloud;
  } else if (code > 4 && code < 49) {
    animationName = animation.cloudy;
  } else if (code > 49 && code < 60) {
    animationName = isNight ? animation.nightRain : animation.sunRain;
  } else if (code > 60 && code < 68) {
    animationName = animation.thunderRain;
  } else if (code > 68 && code < 79) {
    animationName = isNight ? animation.nightSnow : animation.snow;
  } else if (code > 79 && code < 100) {
    animationName = animation.thunderRain;
  }

  return animationName;
  //reference Weather variable documentation
  //WMO Weather interpretation codes (WW)
  //https://open-meteo.com/en/docs
};
