import sunnyJSON from "../assets/backgrounds/01d/background.json";
import overcastJSON from "../assets/backgrounds/04d/background.json";
import showerJSON from "../assets/backgrounds/09d/background.json";
import rainJSON from "../assets/backgrounds/10d/background.json";
import thunderstormJSON from "../assets/backgrounds/11d/background.json";
import mistJSON from "../assets/backgrounds/50d/background.json";
import mistnJSON from "../assets/backgrounds/50n/background.json";

type Props = {
  weatherData: any;
};

function BackgroundImage(props: Props) {
  let weatherIcon = props.weatherData.weather[0].icon
    ? props.weatherData.weather[0].icon
    : "01d";

  let lookup: any = {
    "01d": sunnyJSON,
    "04d": overcastJSON,
    "09d": showerJSON,
    "10d": rainJSON,
    "11d": thunderstormJSON,
    "50d": mistJSON,
    "50n": mistnJSON,
  };

  console.log(
    "Weather icon",
    weatherIcon,
    "bg",
    lookup[weatherIcon].background
  );

  return (
    <>
      <div>
        <img
          className="background w-screen h-screen fixed -z-10 top-0 left-0 object-cover"
          src={lookup[weatherIcon].background}
        />
      </div>
    </>
  );
}

export default BackgroundImage;
