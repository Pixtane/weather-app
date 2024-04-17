import weatherIcons from "../assets/weather-icons.json";

type Props = {
  weatherData: any;
};

function WeatherDataComponent(props: Props) {
  let weatherIconsData =
    weatherIcons[props.weatherData.weather.id as keyof typeof weatherIcons];
  return (
    <>
      <div className="weatherDataComponent w-full flex flex-col items-center">
        <div className="weather-icon h-48 w-48">
          <img
            className="w-full h-full"
            src={"/src/assets/weather-icons/" + weatherIconsData.icon + ".svg"}
            alt={weatherIconsData.description}
          />
        </div>

        <div className="temperature flex text-8xl font-extrabold mt-16">
          {Number(props.weatherData.main.temp).toFixed(0)}
          <p className="tracking-tighter ml-2">°C</p>
        </div>
      </div>
    </>
  );
}

export default WeatherDataComponent;
