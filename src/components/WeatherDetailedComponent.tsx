import weatherIcons from "../assets/weather-icons.json";

type Props = {
  weatherData: any;
};

function WeatherTitleComponent(props: Props) {
  let weatherIconsData =
    weatherIcons[props.weatherData.weather[0].id as keyof typeof weatherIcons];
  return (
    <>
      <div className="mx-10 w-[30rem] ">
        <div className="infoBox">
          <h1 className="text-slate-100 my-1 flex justify-center w-full font-semibold text-2xl">
            Overall
          </h1>

          <div className="infoValue">
            <p className="text-slate-100">Humidity</p>
            <p>{props.weatherData.main.humidity}%</p>
          </div>
          <hr />
          <div className="infoValue">
            <p className="text-slate-100">Pressure</p>
            <p>
              {props.weatherData.main.pressure}
              <span className="text-xs text-gray-100">hPa</span>
            </p>
          </div>
          <hr />
          <div className="infoValue">
            <p className="text-slate-100">Feels like</p>
            <p>{Number(props.weatherData.main.feels_like).toFixed(0)}°</p>
          </div>
          <hr />
          <div className="infoValue">
            <p className="text-slate-100">Visiblity</p>
            <p>{Number(props.weatherData.visibility).toFixed(0)}m</p>
          </div>
          <hr />
          <div className="infoValue">
            <p className="text-slate-100">Clouds</p>
            <p>{Number(props.weatherData.clouds.all).toFixed(0)}%</p>
          </div>
        </div>
        <div className="infoBox">
          <h1 className="text-slate-100 my-1 flex justify-center w-full font-semibold text-2xl">
            Wind
          </h1>

          <div>
            <div className="infoValue">
              <p className="text-slate-100">Speed</p>{" "}
              <p>{props.weatherData.wind.speed} m/s</p>
            </div>
            <hr />
            {props.weatherData.wind.gust && (
              <>
                <div className="infoValue">
                  <p className="text-slate-100">Gust</p>
                  <p>{props.weatherData.wind.gust} m/s</p>
                </div>
                <hr />
              </>
            )}
            {props.weatherData.wind.deg && (
              <>
                <div className="infoValue">
                  <p className="text-slate-100">Wind Direction:</p>
                  <p>{props.weatherData.wind.deg}°</p>
                </div>
                <hr />
              </>
            )}

            <div>
              <svg width="10rem" height="10rem">
                <circle
                  cx="5rem"
                  cy="5rem"
                  r="4.5rem"
                  stroke="#6b7280"
                  strokeWidth="2"
                  fill="none"
                />

                <line
                  x1="2.5rem"
                  y1="2.5rem"
                  x2="5rem"
                  y2="0.5rem"
                  transform={`rotate(${
                    -props.weatherData.wind.deg - 90
                  } 100 100)`}
                  stroke="red"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherTitleComponent;
