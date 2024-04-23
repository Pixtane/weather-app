import * as backgrounds from "../../public/backgrounds";
import RainComponent from "./RainComponent";

type Props = {
  weatherData: any;
};

function BackgroundImage(props: Props) {
  const weatherIcon = props.weatherData.weather[0].icon || "01d";

  const lookup: any = {
    "01d": backgrounds.d01,
    "02d": backgrounds.d02,
    "03d": backgrounds.d03,
    "04d": backgrounds.d04,
    "09d": backgrounds.d09,
    "10d": backgrounds.d10,
    "11d": backgrounds.d11,
    "13d": backgrounds.d13,
    "50d": backgrounds.d50,
    "01n": backgrounds.n01,
    "02n": backgrounds.n02,
    "03n": backgrounds.n03,
    "04n": backgrounds.n04,
    "09n": backgrounds.n09,
    "10n": backgrounds.n10,
    "11n": backgrounds.n11,
    "13n": backgrounds.n13,
    "50n": backgrounds.n50,
  };

  return (
    <div>
      <img
        className="object-cover fixed top-0 left-0 w-screen h-screen background -z-10"
        src={lookup[weatherIcon].background}
        alt="Background"
      />

      <div>
        {["09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n"].includes(
          props.weatherData
            ? props.weatherData.weather[0].icon
              ? props.weatherData.weather[0].icon
              : ""
            : ""
        ) && (
          <RainComponent
            speedMultiplier={
              ["09d", "09n"].includes(props.weatherData.weather[0].icon)
                ? 3
                : ["10d", "10n"].includes(props.weatherData.weather[0].icon)
                ? 1
                : ["11d", "11n"].includes(props.weatherData.weather[0].icon)
                ? 5
                : 0.5
            }
            isSnow={["13d", "13n"].includes(props.weatherData.weather[0].icon)}
          />
        )}
      </div>
    </div>
  );
}

export default BackgroundImage;

