import React from "react";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Three from "./components/three";
import RegisterEmail from "./components/RegisterEmail";
import Footer from './components/Footer'
import "./style/style.css";

const Launch = ({ setIsLanding }) => {
  return (
    <div className="black">
      <Three setLanding={setIsLanding} />
      <Cards/>
      <div
        style={{
          backgroundColor: "#EEE",
          fontSize: "50px",
          fontWeight: 700,
          position: "relative",
          display : "flex",
          justifyContent : "center",
          alignItems : "center",
        }}
      >
        <div style={{position:"absolute", top : "-40px"}}>Power of DIDNOW</div>
      </div>
      <Analytics />
      <Footer />
    </div>
  );
};

export default Launch;
