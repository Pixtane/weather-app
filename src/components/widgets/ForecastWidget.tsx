import React from "react";
import weatherIcons from "../../../public/weather-icons.json";
import { toC } from "../../getWeatherData";
type Props = {
  weatherData: any;
  showMoreForecast: () => void;
};

export const weekDayLookup = {
  Mon: "Mo",
  Tue: "Tu",
  Wed: "We",
  Thu: "Th",
  Fri: "Fr",
  Sat: "Sa",
  Sun: "Su",
};

function ForecastWidget(props: Props) {
  // Function to render forecast items dynamically
  const renderForecastItems = (startIndex: number, endIndex: number) => {
    return props.weatherData.daily
      .slice(startIndex, endIndex)
      .map((data: any, index: number) => {
        let weatherIcon =
          weatherIcons[
            data.conditions.split(", ")[0] as keyof typeof weatherIcons
          ];
        return (
          <React.Fragment key={index}>
            <div className="forecastItem">
              <div className="w-12 min-w-12 h-12 min-h-12 flex flex-col justify-center items-center">
                <img src={`/weather-icons/${weatherIcon.icon}.svg`} alt="" />
                {data.rainTime > 0 && weatherIcon.isRain && (
                  <p className="text-slate-200 -mt-2 text-sm text-center">
                    {data.rainTime}%
                  </p>
                )}
              </div>
              <p className="min-w-4 max-w-4 ml-2.5 flex items-center justify-end">
                {
                  weekDayLookup[
                    new Date(data.datetimeEpoch * 1000).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    ) as keyof typeof weekDayLookup
                  ]
                }
              </p>

              <p className="w-20 ml-2.5 flex items-center text-left">
                {weatherIcon.title}
              </p>

              <div className="flex items-center w-full justify-end mr-3 text-xl">
                {toC(Number(data.tempmin)).toFixed(0)}
                <p className="tracking-tighter ml-0.5">°</p>
                <p className="opacity-60">/</p>
                {toC(Number(data.tempmax)).toFixed(0)}
                <p className="tracking-tighter ml-0.5">°</p>
              </div>
            </div>
            {index !== endIndex - 1 && <hr />}
          </React.Fragment>
        );
      });
  };

  const rowLength = 3;

  return (
    <div className="infoBox">
      <h1 className="flex justify-center my-1 w-full text-2xl font-semibold text-slate-100">
        Forecast
      </h1>

      <div className="forecast flex flex-col">
        {renderForecastItems(0, rowLength)}
      </div>

      <button
        onClick={props.showMoreForecast}
        className="w-full bg-black bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 transition-all p-3 rounded-full flex items-center justify-center"
      >
        More
      </button>
    </div>
  );
}

export default ForecastWidget;
