import SunPath from "../SunPath";

type Props = {
  weatherData: any;
};

function SunWidget(props: Props) {
  return (
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
            timeZone: props.weatherData.timezone,
          })}
        </p>
      </div>
      <hr />

      <div className="infoValue">
        <p className="text-slate-100">Sunrise</p>{" "}
        <p>
          {new Date(props.weatherData.sys.sunrise * 1000).toLocaleTimeString(
            "en-US",
            {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              timeZone: props.weatherData.timezone,
            }
          )}
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
              timeZone: props.weatherData.timezone,
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
  );
}

export default SunWidget;
