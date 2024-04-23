import { useState, useEffect } from "react";
import getWeatherData from "./getWeatherData";
import PlaceSearchComponent from "./components/PlaceSearchComponent";
import mapsvg from "./assets/map.svg";
import BackgroundImage from "./components/BackgroundImage";
import WeatherTitleComponent from "./components/WeatherTitleComponent";
import WeatherDetailedComponent from "./components/WeatherDetailedComponent";
import TestComponent from "./components/TestComponent";
import RainComponent from "./components/RainComponent";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("London");
  const [isSearchHidden, setIsSearchHidden] = useState(true);
  const [showTests, setShowTests] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [selectedNumericalTest, setSelectedNumericalTest] = useState<
    string | null
  >(null);

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
      <div>
        {weatherData && <BackgroundImage weatherData={weatherData} />}

        <div className="flex pt-2 topNavbar">
          {isSearchHidden && (
            <div className="absolute p-5 mt-1.5">
              <button onClick={() => setIsSearchHidden(false)}>
                <img
                  className="w-8 h-8 hover:filter hover:brightness-75 transition-all"
                  src={mapsvg}
                  alt="search"
                />
              </button>
            </div>
          )}

          <h1 className="p-5 w-full text-4xl font-semibold text-center">
            <p
              onClick={() => {
                setShowTests(true);
              }}
            >
              {weatherData ? weatherData.name : "Weather app"}
            </p>
          </h1>
        </div>

        {/* {weatherData && <div>{JSON.stringify(weatherData)}</div>} */}

        <div className="flex flex-col gap-20 items-center h-2/3 md:flex-row space-between">
          {weatherData && <WeatherTitleComponent weatherData={weatherData} />}
          {weatherData && (
            <WeatherDetailedComponent weatherData={weatherData} />
          )}
        </div>

        <div>
          {["09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n"].includes(
            weatherData
              ? weatherData.weather[0].icon
                ? weatherData.weather[0].icon
                : ""
              : ""
          ) && <RainComponent />}
        </div>

        {showTests && (
          <TestComponent
            setSelectedTest={setSelectedTest}
            setSelectedNumericalTest={setSelectedNumericalTest}
            setShowTests={setShowTests}
            setWeatherData={setWeatherData}
            selectedTest={selectedTest}
            selectedNumericalTest={selectedNumericalTest}
          ></TestComponent>
        )}
      </div>
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
