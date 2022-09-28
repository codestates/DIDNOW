import React from "react";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Three from "./components/three";
import { Layout } from "antd";
import FooterBar from "../../component/footerBar";
import "./style/style.css";

const { Footer } = Layout;
const Launch = ({ setIsLanding }) => {
  return (
    <div className="black">
      <Three setLanding={setIsLanding} />
      <Cards />
      <div
        style={{
          backgroundColor: "#EEE",
          fontSize: "50px",
          fontWeight: 700,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", top: "-55px" }}>
          <span style={{fontSize:"40px" ,color:"#629cd4"}}>Why</span> <span style={{fontSize:"60px" ,color:"#0c539c"}}>DIDNOW ?</span> 
        </div>
      </div>
      <Analytics />
      <Footer>
        <FooterBar />
      </Footer>
    </div>
  );
};

export default Launch;
