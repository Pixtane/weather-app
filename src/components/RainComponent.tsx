import React, { useEffect, useState } from "react";
import "./RainStyles.css"; // Assuming you have the styles in a separate CSS file

type Props = {
  speedMultiplier: number;
  rainMultiplier: number;
};

const RainComponent = (props: Props) => {
  const [drops, setDrops] = useState<JSX.Element[]>([]);
  const [backDrops, setBackDrops] = useState<JSX.Element[]>([]);

  useEffect(() => {
    generateRain();
  }, [props.speedMultiplier, props.rainMultiplier]);

  const generateRain = () => {
    let newDrops: JSX.Element[] = [];
    let newBackDrops: JSX.Element[] = [];

    for (let increment = 0; increment < 100 * props.rainMultiplier; ) {
      const randoHundo = Math.floor(Math.random() * 98 + 1);
      const randoFiver = Math.floor(Math.random() * 4 + 2);
      increment += randoFiver + Math.random() - 1;

      const dropStyle = {
        left: `${increment / props.rainMultiplier}%`,
        bottom: `${randoFiver + randoFiver - 1 + 100}%`,
        animationDelay: `0.${randoHundo}s`,
        animationDuration: `${
          Number(
            0.5 + "" + String(randoHundo + Math.random() / 100).replace(".", "")
          ) / Number(props.speedMultiplier)
        }s`,
      };

      const backDropStyle = {
        right: `${increment}%`,
        bottom: `${randoFiver + randoFiver - 1 + 100}%`,
        animationDelay: `0.${randoHundo}s`,
        animationDuration: `${
          Number(
            0.5 + "" + String(randoHundo + Math.random() / 100).replace(".", "")
          ) / Number(props.speedMultiplier)
        }s`,
      };

      const drop = (
        <div key={`drop-${increment}`} className="drop" style={dropStyle}>
          <div className="stem" style={dropStyle}></div>
          <div className="splat" style={dropStyle}></div>
        </div>
      );

      const backDrop = (
        <div
          key={`back-drop-${increment}`}
          className="drop"
          style={backDropStyle}
        >
          <div className="stem" style={backDropStyle}></div>
          <div className="splat" style={backDropStyle}></div>
        </div>
      );

      newDrops.push(drop);
      newBackDrops.push(backDrop);
    }

    setDrops(newDrops);
    setBackDrops(newBackDrops);
  };

  return (
    <div className={`rain-container back-row-toggle splat-toggle`}>
      <div className="rain front-row">{drops}</div>
      <div className="rain back-row">{backDrops}</div>
    </div>
  );
};

export default RainComponent;
