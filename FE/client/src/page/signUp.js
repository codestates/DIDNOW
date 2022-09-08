import { Row, Col } from "antd";
import "./style/signUp.css";
import signUpImage from "../img/signup.jpg";
import { useState, useEffect } from "react";
import SingUpChoice from "../component/signupChoice";
import HolderSignUp from "../component/holderSignUp";
import IssuerSignUp from "../component/issuerSignUp";
import VerifierSignUp from "../component/verifierSignUp";

const SignUp = () => {
  const [type, setType] = useState("");
  useEffect(() => {
    setType("");
  }, []);
  useEffect(() => {});

  let renderByType = "";
  if (type === "" || type === "company") {
    renderByType = <SingUpChoice type={type} setType={setType} />;
  } else if (type === "holder") {
    renderByType = <HolderSignUp />;
  } else if (type === "issuer") {
    renderByType = <IssuerSignUp />;
  } else if (type === "verifier") {
    renderByType = <VerifierSignUp />;
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
              {renderByType}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;