import React, { useState, useEffect } from "react";
import getWeatherData from "./getWeatherData";
import PlaceSearchComponent from "./components/PlaceSearchComponent";
import mapsvg from "./assets/map.svg";
import BackgroundImage from "./components/BackgroundImage";
import WeatherTitleComponent from "./components/WeatherTitleComponent";
import WeatherDetailedComponent from "./components/WeatherDetailedComponent";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("London");
  const [isSearchHidden, setIsSearchHidden] = useState(true);

  let storedCoordinates = localStorage.getItem("coordinates");

  const [coordinates, setCoordinates] = useState({
    lat: storedCoordinates ? JSON.parse(storedCoordinates).lat : 51.50853,
    lon: storedCoordinates ? JSON.parse(storedCoordinates).lon : -0.12574,
  });

  function setNewCoordinates(newCoordinates: { lat: number; lon: number }) {
    localStorage.setItem("coordinates", JSON.stringify(newCoordinates));
    setCoordinates(newCoordinates);
  }

  useEffect(() => {
    const fetchData = async () => {
      // Check if weather data for the city is stored in local storage
      const storedWeatherData = localStorage.getItem("weatherData");
      if (storedWeatherData) {
        const parsedWeatherData = JSON.parse(storedWeatherData);
        const storedTimestamp = parsedWeatherData.timestamp;
        const currentTimestamp = new Date().getTime();
        const hoursPassed =
          (currentTimestamp - storedTimestamp) / (1000 * 60 * 60);

        // If less than a day has passed, use stored data
        console.log(
          hoursPassed,
          weatherData ? weatherData.name : "no weather data",
          city
        );
        if (hoursPassed < 24 && parsedWeatherData.data.name === city) {
          setWeatherData(parsedWeatherData.data);
          return;
        }
      }

      // If no data is stored or more than a day has passed, fetch new data
      try {
        const data = await getWeatherData(coordinates.lat, coordinates.lon);
        if (!data || data === null) {
          return;
        }
        setWeatherData(data);
        // Store fetched data in local storage
        localStorage.setItem(
          "weatherData",
          JSON.stringify({ data, timestamp: new Date().getTime() })
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [coordinates]); // Empty dependency array ensures this effect runs only once

  if (isSearchHidden) {
    return (
      <>
        {weatherData && <BackgroundImage weatherData={weatherData} />}

        <div className="topNavbar pt-2 flex">
          {isSearchHidden && (
            <div className="absolute p-5">
              <button onClick={() => setIsSearchHidden(false)}>
                <img className="w-8 h-8" src={mapsvg} alt="search" />
              </button>
            </div>
          )}

          <h1 className="w-full text-center font-semibold text-4xl p-5">
            {weatherData ? weatherData.name : "Weather app"}
          </h1>
        </div>

        {/* {weatherData && <div>{JSON.stringify(weatherData)}</div>} */}

        <div className="flex flex-row items-center space-between h-2/3">
          {weatherData && <WeatherTitleComponent weatherData={weatherData} />}
          {weatherData && (
            <WeatherDetailedComponent weatherData={weatherData} />
          )}
        </div>
      </>
    );
  } else {
    return (
      <PlaceSearchComponent
        onPlaceSelect={(data) => {
          setIsSearchHidden(true);
          setCity(data.name);
          setNewCoordinates({ lat: data.lat, lon: data.lng });
        }}
      ></PlaceSearchComponent>
    );
  }
}

export default App;
