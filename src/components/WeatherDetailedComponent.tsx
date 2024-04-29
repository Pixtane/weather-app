import { useEffect } from "react";
import arrowsvg from "/arrow.svg";
import weatherColors from "../../public/infoBoxLookup.json";
import SunPath from "./SunPath";

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
      <div className="mx-10 md:w-[30rem] min-w-[13rem] w-full max-w-[30rem]">
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
              <span className="text-xs font-bold text-gray-100">hPa</span>
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
                <svg
                  className=""
                  preserveAspectRatio="xMinYMin meet"
                  viewBox="0 0 160 160"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="rgb(156 163 175)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <text
                    x="74"
                    y="35"
                    className="text-xl"
                    fill="rgb(209 213 219)"
                  >
                    N
                  </text>
                  <text
                    x="75"
                    y="140"
                    className="text-xl"
                    fill="rgb(209 213 219)"
                  >
                    S
                  </text>
                  <text
                    x="17"
                    y="87.5"
                    className="text-xl"
                    fill="rgb(209 213 219)"
                  >
                    W
                  </text>
                  <text
                    x="129"
                    y="87.5"
                    className="text-xl"
                    fill="rgb(209 213 219)"
                  >
                    E
                  </text>
                  <image
                    className="compass-arrow origin-[50%_50%]"
                    xlinkHref={arrowsvg}
                    width="10rem"
                    height="10rem"
                    transform={`translate(2 0) rotate(${
                      props.weatherData.wind.deg + 90
                    })`}
                  />
                </svg>
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
        <div className="infoBox">
          <div className="infoValue">
            <div className="thanks">
              This app was made possible by{" "}
              <a href="https://openweathermap.org/">OpenWeatherMap</a> and{" "}
              <a href="https://www.geonames.org/">GeoNames</a>. <br />
              <a
                data-tooltip-bottom="If places don't load, you can try going there and activating it."
                href="https://cors-anywhere.herokuapp.com/corsdemo"
              >
                Proxy url
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherTitleComponent;
