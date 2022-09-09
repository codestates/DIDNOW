import { Row, Col } from "antd";
import "./style/signUp.css";
import signUpImage from "../img/signup.jpg";
import { useState, useEffect } from "react";
import SingUpChoice from "../component/signupChoice";
import HolderSignUp from "../component/holderSignUp";
import IssuerSignUp from "../component/issuerSignUp";
import VerifierSignUp from "../component/verifierSignUp";

const SignUp = () => {
  const [way, setWay] = useState("");
  useEffect(() => {
    setWay("");
  }, []);
  useEffect(() => {});

  let renderByway = "";
  if (way === "" || way === "company") {
    renderByway = <SingUpChoice way={way} setWay={setWay} />;
  } else if (way === "holder") {
    renderByway = <HolderSignUp />;
  } else if (way === "issuer") {
    renderByway = <IssuerSignUp />;
  } else if (way === "verifier") {
    renderByway = <VerifierSignUp />;
  } else {
    <>오류 발생</>;
  }

  return (
    <div className="signup">
      <Row>
        <Col span={12}>
          <div className="signup--left">
            <img src={signUpImage} className="signup--image" alt="" />
          </div>
        </Col>
        <Col span={12}>
          <div className="signup--right">
            <div className="signup--canvas">
              {/* first choice holder or company(issuer or verifier) */}
              {renderByway}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
