export const getDescription = (code: number): string => {
  let description = '';

  switch (code) {
    case 0:
      description = 'Clear sky';
      break;
    case 1:
      description = 'Mainly clear';
      break;
    case 2:
      description = 'Partly cloudy';
      break;
    case 3:
      description = 'Overcast';
      break;
    case 45:
    case 48:
      description = 'Fog and depositing rime fog';
      break;
    case 51:
      description = 'Drizzle: Light';
      break;
    case 53:
      description = 'Drizzle: Moderate';
      break;
    case 55:
      description = 'Drizzle: Dense intensity';
      break;
    case 56:
      description = 'Freezing Drizzle: Light';
      break;
    case 57:
      description = 'Freezing Drizzle: Dense intensity';
      break;
    case 61:
      description = 'Rain: Slight intensity';
      break;
    case 63:
      description = 'Rain: Moderate intensity';
      break;
    case 65:
      description = 'Rain: Heavy intensity';
      break;
    case 66:
      description = 'Freezing Rain: Light intensity';
      break;
    case 67:
      description = 'Freezing Rain: Heavy intensity';
      break;
    case 71:
      description = 'Snow fall: Slight intensity';
      break;
    case 73:
      description = 'Snow fall: Moderate intensity';
      break;
    case 75:
      description = 'Snow fall: Heavy intensity';
      break;
    case 77:
      description = 'Snow grains';
      break;
    case 80:
      description = 'Rain showers: Slight';
      break;
    case 81:
      description = 'Rain showers: Moderate';
      break;
    case 82:
      description = 'Rain showers: Violent';
      break;
    case 85:
      description = 'Snow showers: Slight';
      break;
    case 86:
      description = 'Snow showers: Heavy';
      break;
    case 95:
      description = 'Thunderstorm: Slight or moderate';
      break;
    case 96:
      description = 'Thunderstorm with slight hail';
      break;
    case 99:
      description = 'Thunderstorm with heavy hail';
      break;
    default:
      // Find the nearest existing code
      let nearestCode = Object.keys(descriptionMap)
        .map(Number)
        .reduce((prev, curr) =>
          Math.abs(curr - code) < Math.abs(prev - code) ? curr : prev,
        );

      // Set description based on the nearest existing code
      description = descriptionMap[nearestCode];
  }

  return description;
};

const descriptionMap: {[key: number]: string} = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog and depositing rime fog',
  48: 'Fog and depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight intensity',
  63: 'Rain: Moderate intensity',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light intensity',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight intensity',
  73: 'Snow fall: Moderate intensity',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Slight',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};
