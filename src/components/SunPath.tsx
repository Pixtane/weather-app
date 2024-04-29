import { useState, useEffect } from "react";

const SunPath = ({
  currentTime,
  sunriseTime,
  sunsetTime,
}: {
  currentTime: number;
  sunriseTime: number;
  sunsetTime: number;
}) => {
  // Calculate the percentage of the current time between sunrise and sunset
  const calculateSunPosition = (
    currentTime: number,
    sunriseTime: number,
    sunsetTime: number
  ) => {
    const totalDuration = sunsetTime - sunriseTime;
    const currentDuration = Math.floor(currentTime / 1000) - sunriseTime;
    console.log(
      totalDuration,
      currentDuration,
      currentTime,
      currentDuration / totalDuration
    );
    return (currentDuration / totalDuration) * 100;
  };

  function convertCoordinates(
    x_old: number,
    y_old: number
  ): { x: number; y: number } {
    const x_new = (x_old / 14.45) * 64 + 21.7043584386; // Scale x-coordinate
    const y_new = 64 - (y_old / 14.45) * 64 - 15.4193; // Flip y-coordinate
    return { x: x_new, y: y_new };
  }

  // Calculate the x and y coordinates based on the percentage and the path
  const calculateSunCoordinates = (percentage: number) => {
    // Convert percentage to a value between 0 and 1
    const t = percentage / 100;

    // Define the start and end points of the parabola
    const startPoint = { x: 0, y: 64 };
    const endPoint = { x: 14.45, y: 64 };

    // Interpolate x-coordinate
    const x = startPoint.x * (1 - t) + endPoint.x * t;

    // Calculate y-coordinate using the parabola equation
    const y = -((x - 7.228) ** 2 / 5.5) + 9.5;

    return convertCoordinates(x, y);
  };

  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const percentage = calculateSunPosition(
      currentTime,
      sunriseTime,
      sunsetTime
    );
    console.log("percentage", percentage);
    const newPosition = calculateSunCoordinates(percentage);
    console.log("newPosition", newPosition);
    setSunPosition(newPosition);
  }, [currentTime, sunriseTime, sunsetTime]);
  console.log("sunPosition", sunPosition);

  return (
    <svg
      id="a"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="12rem"
      height="7rem"
      viewBox="0 0 104.51 61.99"
    >
      <defs>
        <style>
          {
            ".e{fill:url(#c);}.f{opacity:.15;}.f,.g,.h,.i,.j,.k{fill:#f1f5f9;}.l{fill:#f2f3e5;}.g{opacity:.3;}.h{opacity:.1;}.m{fill:url(#b);}.i{opacity:.25;}.n{fill:url(#d);}.j{opacity:.2;}.k{opacity:.05;}"
          }
        </style>
        <linearGradient
          id="b"
          x1="54.51"
          y1="47.38"
          x2="54.51"
          y2="4.59"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e3e8f1" stopOpacity="0" />
          <stop offset="1" stopColor="#d3dbe2" />
        </linearGradient>
        <radialGradient
          id="c"
          cx={sunPosition.x}
          cy={sunPosition.y}
          fx={sunPosition.x}
          fy={sunPosition.y}
          r="14.61"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f2f3e5" stopOpacity=".5" />
          <stop offset=".43" stopColor="#f8f8f1" stopOpacity=".25" />
          <stop offset=".79" stopColor="#fdfdfb" stopOpacity=".07" />
          <stop offset=".98" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="d"
          cx={sunPosition.x}
          cy={sunPosition.y}
          fx={sunPosition.x}
          fy={sunPosition.y}
          r="14.61"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f2f3e5" />
          <stop offset=".07" stopColor="#f3f4e7" stopOpacity=".91" />
          <stop offset=".21" stopColor="#f6f6ed" stopOpacity=".69" />
          <stop offset=".4" stopColor="#fafaf6" stopOpacity=".34" />
          <stop offset=".58" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        transform="translate(0, 10)"
        className="m"
        d="M78.51,28.66c-1.43-3.56-3.11-7.85-8-13.37-4.39-4.96-9.47-10.7-16-10.7s-11.61,5.74-16,10.7c-4.89,5.52-6.57,9.81-8,13.37-1.71,4.25-4.36,10.65-8,18.72h1.91c3.42-7.74,5.91-13.87,7.52-17.95,1.35-3.41,2.92-7.53,7.52-12.82,4.13-4.75,8.91-10.26,15.04-10.26s10.92,5.5,15.04,10.26c4.6,5.29,6.17,9.41,7.52,12.82,1.61,4.07,4.1,10.2,7.52,17.95h1.91c-3.64-8.08-6.29-14.47-8-18.72Z"
      />
      <g transform="translate(0, 10)" className="sun-group">
        <circle className="e" cx={sunPosition.x} cy={sunPosition.y} r="14.61" />
        <circle className="n" cx={sunPosition.x} cy={sunPosition.y} r="14.61" />
        <circle className="l" cx={sunPosition.x} cy={sunPosition.y} r="4" />
      </g>
      <g transform="translate(0, 18)">
        <rect className="g" x="4.51" y="32.14" width="100" height=".76" />
        <rect className="i" x="5.51" y="34.61" width="98" height=".75" />
        <rect className="j" x="6.51" y="37.15" width="96" height=".75" />
        <rect className="f" x="7.51" y="39.69" width="94" height=".75" />
        <rect className="h" x="8.51" y="42.12" width="92" height=".75" />
        <rect className="k" x="9.52" y="44.55" width="90" height=".75" />
      </g>
    </svg>
  );
};

export default SunPath;
