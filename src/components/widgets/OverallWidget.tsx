type Props = {
  weatherData: any;
};

function OverallWidget(props: Props) {
  return (
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
  );
}

export default OverallWidget;
