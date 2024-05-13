import React from "react";
import { toC } from "../getWeatherData";
import weatherIcons from "../../public/weather-icons.json";
import { weekDayLookup } from "./widgets/ForecastWidget";

type Props = {
  exit: () => void;
  weatherData: any;
};

export default function Forecast({ exit, weatherData }: Props) {
  const renderForecastItems = (startIndex: number, endIndex: number) => {
    return weatherData.daily
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

  const rowLength = 15;

  return (
    <div className="w-screen h-full overflow-x-hidden bg-black bg-opacity-40 backdrop-blur-2xl fixed top-0 left-0 p-5">
      <button className="transition-all duration-100 brightness-100 hover:brightness-75 absolute pt-3 pl-1 pr-5 pb-5 mt-1.5">
        <img
          onClick={exit}
          className="w-8 h-8 drop-shadow-lg"
          src="/leave.svg"
          alt="Go back"
          title="Go back"
        />
      </button>

      <h1 className="p-5 pt-2 w-full text-4xl font-semibold flex justify-center text-center">
        Forecast
      </h1>

      <div>{renderForecastItems(0, rowLength)}</div>
    </div>
  );
}
