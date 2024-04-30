import arrowsvg from "/arrow.svg";

type Props = {
  weatherData: any;
};

function CompassElement(props: Props) {
  return (
    <svg className="" preserveAspectRatio="xMinYMin meet" viewBox="0 0 160 160">
      <circle
        cx="80"
        cy="80"
        r="72"
        stroke="rgb(156 163 175)"
        strokeWidth="1.5"
        fill="none"
      />
      <text x="74" y="35" className="text-xl" fill="rgb(209 213 219)">
        N
      </text>
      <text x="75" y="140" className="text-xl" fill="rgb(209 213 219)">
        S
      </text>
      <text x="17" y="87.5" className="text-xl" fill="rgb(209 213 219)">
        W
      </text>
      <text x="129" y="87.5" className="text-xl" fill="rgb(209 213 219)">
        E
      </text>
      <image
        className="compass-arrow origin-[50%_50%]"
        xlinkHref={arrowsvg}
        width="10rem"
        height="10rem"
        transform={`translate(2 0) rotate(${props.weatherData.wind.deg + 90})`}
      />
    </svg>
  );
}

export default CompassElement;
