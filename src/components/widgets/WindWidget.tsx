import CompassElement from "../CompassElement";

type Props = {
  weatherData: any;
};

function WindWidget(props: Props) {
  return (
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
  );
}

export default WindWidget;
