import { useEffect } from "react";
import weatherColors from "../../public/infoBoxLookup.json";
import OverallWidget from "./widgets/OverallWidget";
import WindWidget from "./widgets/WindWidget";
import SunWidget from "./widgets/SunWidget";
import RadarWidget from "./widgets/RadarWidget";
import ForecastWidget from "./widgets/ForecastWidget";

type Props = {
  weatherData: any;
  showMoreForecast: () => void;
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
        <OverallWidget weatherData={props.weatherData} />
        <WindWidget weatherData={props.weatherData} />
        <SunWidget weatherData={props.weatherData} />
        <RadarWidget></RadarWidget>
        <ForecastWidget
          showMoreForecast={props.showMoreForecast}
          weatherData={props.weatherData}
        />
      </div>
    </>
  );
}

export default WeatherTitleComponent;
