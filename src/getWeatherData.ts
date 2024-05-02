import axios from "axios";

async function getOpenWeatherData(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_OPEN_API_KEY; // Replace with your actual API key
  const proxyUrl = ""; //"https://cors-anywhere.herokuapp.com/"; // Example CORS proxy

  const url = `${proxyUrl}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Error: ${response.status} ${response.data}`);
      return null;
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error: any) {
    console.error("Request failed:", error);
    return null;
  }
}

if (false) {
    getOpenWeatherData(0, 0); // Fixing unused?
}

function toC(temp: number) {
  return ((temp - 32) * 5) / 9;
}

async function getWeatherData(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your actual API key
  const proxyUrl = ""; //"https://cors-anywhere.herokuapp.com/"; // Example CORS proxy

  const url = `${proxyUrl}https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Error: ${response.status} ${response.data}`);
      return null;
    } else {
      console.log(response.data);
      let data = response.data;
      let iconLookup = {
        "clear-day": "01d",
        "clear-night": "01n",
        "partly-cloudy-day": "02d",
        "partly-cloudy-night": "02n",
        "showers-day": "09d",
        "showers-night": "09n",
        "thunder-showers-day": "11d",
        "thunder-showers-night": "11n",
        "snow-showers-day": "13d",
        "snow-showers-night": "13n",
      };
      function isNight(data: any) {
        if (
          data.currentConditions.datetimeEpoch <
            data.currentConditions.sunsetEpoch &&
          data.currentConditions.datetimeEpoch >
            data.currentConditions.sunriseEpoch
        ) {
          return false;
        }
      }
      function lookupIcon(icon: string) {
        if (icon === "cloudy") {
          if (data.currentConditions.cloudcover > 50) {
            return isNight(data) ? "04n" : "04d";
          } else {
            return isNight(data) ? "03n" : "03d";
          }
        }
        if (icon === "rain") {
          return isNight(data) ? "10n" : "10d";
        }
        if (icon === "thunder-rain") {
          return isNight(data) ? "11n" : "11d";
        }
        if (icon === "snow") {
          return isNight(data) ? "13n" : "13d";
        }
        if (icon === "fog") {
          return isNight(data) ? "50n" : "50d";
        }
        if (icon === "wind") {
          return isNight(data) ? "50n" : "50d";
        }
        return iconLookup[icon as keyof typeof iconLookup];
      }

      let newData = {
        main: {
          feels_like: toC(data.currentConditions.feelslike),
          humidity: data.currentConditions.humidity,
          pressure: data.currentConditions.pressure,
          temp: toC(data.currentConditions.temp),
          temp_max: toC(data.days[0].tempmax),
          temp_min: toC(data.days[0].tempmin),
          uvi: data.days[0].uvindex,
        },
        clouds: {
          all: data.currentConditions.cloudcover,
        },
        weather: [
          {
            icon: lookupIcon(data.currentConditions.icon),
            id: data.currentConditions.conditions.split(", ")[0],
            weatherList: data.currentConditions.conditions.split(", "),
          },
        ],
        wind: {
          speed: (data.currentConditions.windspeed * 1.609344).toFixed(2),
          gust: (data.currentConditions.windgust * 1.609344).toFixed(2),
          deg: data.currentConditions.winddir,
        },
        sys: {
          sunrise: data.currentConditions.sunriseEpoch,
          sunset: data.currentConditions.sunsetEpoch,
        },
        visibility: (data.currentConditions.visibility * 1609.344).toFixed(2),
        original: data,
      };

      console.log(newData);
      return newData;
    }
  } catch (error: any) {
    console.error("Request failed:", error);
    return null;
  }
}

export default getWeatherData;
