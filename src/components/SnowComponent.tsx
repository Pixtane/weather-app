import React, { useEffect } from "react";
import "./Snow.scss";

interface SnowProps {
  flakes: number;
}

const SnowComponent: React.FC<SnowProps> = ({ flakes }) => {
  useEffect(() => {
    const snowContainer = document.getElementById("snow-container");
    if (snowContainer) {
      for (let i = 0; i < flakes; i++) {
        const flake = document.createElement("div");
        flake.classList.add("flake");
        snowContainer.appendChild(flake);
      }
    }
  }, [flakes]);

  return <div id="snow-container" className="snow"></div>;
};

export default SnowComponent;
