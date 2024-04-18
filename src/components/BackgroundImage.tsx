import * as React from "react";
import * as backgrounds from "../assets/backgrounds";

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
        className="background w-screen h-screen fixed -z-10 top-0 left-0 object-cover"
        src={lookup[weatherIcon].background}
        alt="Background"
      />
    </div>
  );
}

export default BackgroundImage;
