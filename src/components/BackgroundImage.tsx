import sunnyJSON from "../assets/backgrounds/01d/background.json";

type Props = {
  weatherData: any;
};

function BackgroundImage(props: Props) {
  let weatherIcon = props.weatherData.weather.icon
    ? props.weatherData.weather.icon
    : "01d";

  let lookup: any = {
    "01d": sunnyJSON,
  };

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
