import weatherIcons from "../assets/weather-icons.json";

type Props = {
  weatherData: any;
};

function WeatherTitleComponent(props: Props) {
  let weatherIconsData =
    weatherIcons[props.weatherData.weather[0].id as keyof typeof weatherIcons];
  return (
    <>
      <div className="weatherDataComponent w-full h-4/6 flex flex-row justify-center items-center">
        <div className="weather-icon h-60 w-60">
          <img
            className="w-full h-full"
            src={"/src/assets/weather-icons/" + weatherIconsData.icon + ".svg"}
            alt={weatherIconsData.description}
          />
        </div>

        <div className="temperature mt-16 flex flex-col items-center">
          <div className="flex text-9xl font-normal">
            {Number(props.weatherData.main.temp).toFixed(0)}
            <p className="tracking-tighter text-5xl ml-0">°C</p>
          </div>

          <div className="flex flex-row text-gray-50 items-center text-3xl mt-4">
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
