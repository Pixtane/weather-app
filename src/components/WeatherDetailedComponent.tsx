import { useEffect } from "react";
import weatherColors from "../../public/infoBoxLookup.json";
import SunPath from "./SunPath";
import CompassElement from "./CompassElement";

type Props = {
  weatherData: any;
};

function WeatherTitleComponent(props: Props) {
  useEffect(() => {
    // Update CSS variables based on current weather condition
    const root = document.documentElement;
    const backgroundColor =
      weatherColors[
        props.weatherData.weather[0].icon as keyof typeof weatherColors
      ] || "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))";

    root.style.setProperty("--background-color-default", backgroundColor);
  }, [props.weatherData]);

  return (
    <>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3 xl:max-w-[80rem] 2xl:max-w-[90rem] mx-10 md:w-[90rem] md:max-w-[47rem] lg:max-w-[60rem] min-w-[13rem] w-full max-w-[30rem]">
        <div className="infoBox">
          <h1 className="flex justify-center my-1 w-full text-2xl font-semibold text-slate-100">
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
              <span className="text-xs font-bold text-gray-100">mBar</span>
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
          {(props.weatherData.main.uvi || props.weatherData.main.uvi === 0) && (
            <>
              <hr />
              <div className="infoValue">
                <p className="text-slate-100">UV index</p>
                <p>{Number(props.weatherData.main.uvi).toFixed(0)}</p>
              </div>
            </>
          )}
        </div>
        <div className="infoBox">
          <h1 className="flex justify-center my-1 w-full text-2xl font-semibold text-slate-100">
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

            <div className="flex justify-center w-full">
              <div className="w-32 h-32">
                <CompassElement weatherData={props.weatherData} />
              </div>
            </div>
          </div>
        </div>
        <div className="infoBox">
          <h1 className="flex justify-center my-1 w-full text-2xl font-semibold text-slate-100">
            Sun
          </h1>

          <div className="infoValue">
            <p className="text-slate-100">Now</p>{" "}
            <p>
              {new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                timeZone: props.weatherData.original.timezone,
              })}
            </p>
          </div>
          <hr />

          <div className="infoValue">
            <p className="text-slate-100">Sunrise</p>{" "}
            <p>
              {new Date(
                props.weatherData.sys.sunrise * 1000
              ).toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                timeZone: props.weatherData.original.timezone,
              })}
            </p>
          </div>
          <hr />

          <div className="infoValue">
            <p className="text-slate-100">Sunset</p>{" "}
            <p>
              {new Date(props.weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-US",
                {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: props.weatherData.original.timezone,
                }
              )}
            </p>
          </div>
          <hr />

          <div className="flex justify-center w-full">
            <SunPath
              currentTime={new Date().getTime()}
              sunriseTime={props.weatherData.sys.sunrise}
              sunsetTime={props.weatherData.sys.sunset}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherTitleComponent;
