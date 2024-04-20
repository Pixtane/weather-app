import { useEffect } from "react";
import weatherIcons from "../assets/weather-icons.json";

type Props = {
  weatherData: any;
};

function WeatherTitleComponent(props: Props) {
  let weatherIconsData =
    weatherIcons[props.weatherData.weather[0].id as keyof typeof weatherIcons];

  useEffect(() => {
    // Set the favicon dynamically
    const favicon = document.querySelector(
      'link[rel="icon"]'
    ) as HTMLLinkElement;
    const weatherIconsData =
      weatherIcons[
        props.weatherData.weather[0].id as keyof typeof weatherIcons
      ];
    if (favicon) {
      favicon.href =
        "/src/assets/weather-icons/" + weatherIconsData.icon + ".svg";
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href =
        "/src/assets/weather-icons/" + weatherIconsData.icon + ".svg";
      document.head.appendChild(newFavicon);
    }
  }, [props.weatherData]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full md:flex-row weatherDataComponent">
        <div className="w-60 h-60 weather-icon">
          <img
            className="w-full h-full"
            src={"/src/assets/weather-icons/" + weatherIconsData.icon + ".svg"}
            alt={weatherIconsData.description}
          />
        </div>

        <div className="flex flex-col items-center md:mt-16 temperature">
          <div className="flex text-9xl font-normal">
            {Number(props.weatherData.main.temp).toFixed(0)}
            <p className="ml-0 text-5xl tracking-tighter">°C</p>
          </div>

          <div className="flex flex-row items-center mt-4 text-3xl text-gray-50">
            {props.weatherData.weather[0].main}{" "}
            <div className="flex ml-3">
              {Number(props.weatherData.main.temp_min).toFixed(0)}
              <p className="tracking-tighter ml-0.5">°C</p>
              <p className="text-gray-300">/</p>
              {Number(props.weatherData.main.temp_max).toFixed(0)}
              <p className="tracking-tighter ml-0.5">°C</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherTitleComponent;
