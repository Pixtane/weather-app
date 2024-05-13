import { useState, useEffect } from "react";
import getWeatherData from "./getWeatherData";
import PlaceSearchComponent from "./components/PlaceSearchComponent";
import mapsvg from "/map.svg";
import BackgroundImage from "./components/BackgroundImage";
import WeatherTitleComponent from "./components/WeatherTitleComponent";
import WeatherDetailedComponent from "./components/WeatherDetailedComponent";
import TestComponent from "./components/TestComponent";
import Forecast from "./components/ForecastComponent";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState<string | null>(
    JSON.parse(
      localStorage.getItem("city")
        ? (localStorage.getItem("city") as string)
        : '{"name":""}'
    ).name
  );
  const [isSearchHidden, setIsSearchHidden] = useState(true);
  const [isForecastHidden, setIsForecastHidden] = useState(true);
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
    console.log("setNewCoordinates", newCoordinates);
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
        // console.log(
        //   hoursPassed,
        //   weatherData ? weatherData.name : "no weather data",
        //   city,
        //   parsedWeatherData,
        //   parsedWeatherData.data.latitude,
        //   parsedWeatherData.data.longitude,
        //   coordinates.lat,
        //   coordinates.lon
        // );
        if (
          hoursPassed < 6 &&
          parsedWeatherData.data.latitude === Number(coordinates.lat) &&
          parsedWeatherData.data.longitude === Number(coordinates.lon)
        ) {
          setWeatherData(parsedWeatherData.data);
          return;
        }
      }

      if (
        localStorage.getItem("city") !== city &&
        localStorage.getItem("city") !== null
      ) {
        console.log(
          "city changed to",
          JSON.parse(localStorage.getItem("city") as string).name
        );
        setCity(JSON.parse(localStorage.getItem("city") as string).name);
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

  function showForecast() {
    setIsForecastHidden(!isForecastHidden);
  }

  return (
    <div>
      {weatherData && <BackgroundImage weatherData={weatherData} />}

      <div className="flex pt-2 topNavbar">
        <h1 className="p-5 w-full text-4xl font-semibold flex justify-center text-center">
          <p
            title="Tests"
            onClick={() => {
              setShowTests(true);
            }}
            className="drop-shadow-lg"
          >
            {city ? city : "Weather app"}
          </p>
        </h1>

        <div className="absolute p-5 mt-1.5">
          <button
            className="transition-all duration-100 brightness-100 hover:brightness-75"
            onClick={() => setIsSearchHidden(false)}
            title="Search new location"
          >
            <img className="w-8 h-8 drop-shadow-lg" src={mapsvg} alt="search" />
          </button>
        </div>
      </div>

      {/* {weatherData && <div>{JSON.stringify(weatherData)}</div>} */}

      <div className="flex flex-col lg:gap-20 md:gap-10 gap-20 items-center h-2/3 md:flex-col space-between">
        {weatherData && <WeatherTitleComponent weatherData={weatherData} />}
        {weatherData && (
          <WeatherDetailedComponent
            showMoreForecast={showForecast}
            weatherData={weatherData}
          />
        )}
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

      {!isSearchHidden && (
        <PlaceSearchComponent
          exit={() => setIsSearchHidden(true)}
          onPlaceSelect={(data) => {
            localStorage.setItem("city", JSON.stringify(data));
            setNewCoordinates({ lat: data.lat, lon: data.lng });
            setIsSearchHidden(true);
            setCity(data.name);
          }}
        ></PlaceSearchComponent>
      )}

      {!isForecastHidden && (
        <Forecast exit={showForecast} weatherData={weatherData}></Forecast>
      )}
    </div>
  );
}

export default App;
