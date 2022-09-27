import React from "react";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Three from "./components/three";
import RegisterEmail from "./components/RegisterEmail";
import "./style/style.css";

const Launch = ({ setIsLanding }) => {
  return (
    <div className="black">
      <Three setLanding={setIsLanding} />
      <Cards />
      <Analytics />
    </div>
  );
};

export default Launch;
