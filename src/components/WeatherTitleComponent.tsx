import { useEffect } from "react";
import weatherIcons from "../../public/weather-icons.json";

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
      favicon.href = "/weather-icons/" + weatherIconsData.icon + ".svg";
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = "/weather-icons/" + weatherIconsData.icon + ".svg";
      document.head.appendChild(newFavicon);
    }

    document.title =
      (props.weatherData.main.temp
        ? Number(props.weatherData.main.temp).toFixed(0) + "° "
        : "") +
      (props.weatherData.name ? props.weatherData.name : "Weather app");
  }, [props.weatherData]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-20rem)] md:mb-32 md:mt-28 md:flex-row weatherDataComponent">
        <div className="w-60 h-60 weather-icon hidden md:block">
          <img
            className="w-full h-full drop-shadow-lg"
            src={"/weather-icons/" + weatherIconsData.icon + ".svg"}
            alt={weatherIconsData.description}
          />
        </div>

        <div className="flex flex-col drop-shadow-lg items-center mt-40 mb-40 md:mb-40 md:mt-40 temperature">
          <div className="flex text-9xl ml-10 font-normal">
            {Number(props.weatherData.main.temp).toFixed(0)}
            <p className="ml-0 text-5xl tracking-tighter">°C</p>
          </div>

          <div className="flex flex-col items-center text-center justify-center mt-4 text-3xl opacity-85">
            {props.weatherData.weather[0].weatherList
              .map(
                (id: string) =>
                  weatherIcons[id as keyof typeof weatherIcons]?.title ||
                  "Unknown"
              )
              .join(", ")}{" "}
            <div className="flex">
              {Number(props.weatherData.main.temp_min).toFixed(0)}
              <p className="tracking-tighter ml-0.5">°</p>
              <p className="opacity-60">/</p>
              {Number(props.weatherData.main.temp_max).toFixed(0)}
              <p className="tracking-tighter ml-0.5">°</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherTitleComponent;
