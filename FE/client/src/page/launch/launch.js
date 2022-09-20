import React from "react";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Three from "./components/three";
import RegisterEmail from "./components/RegisterEmail";
import "./style/style.css";

const Launch = ({ setIsLanding }) => {
  return (
    <div className="black">
      <Three setLanding={setIsLanding} />
      <Cards />
      <RegisterEmail />
      <Analytics />
      <Footer />
    </div>
  );
};

export default Launch;
