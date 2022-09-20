import React from "react";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Three from "./components/three";
import RegisterEmail from "./components/RegisterEmail";
import "./style/style.css";

const Launch = () => {
  return (
    <div className="black">
      <Three />
      <Cards />
      <RegisterEmail />
      <Analytics />
      <Footer />
    </div>
  );
};

export default Launch;
