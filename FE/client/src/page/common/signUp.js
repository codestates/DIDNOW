import { Row, Col } from "antd";
import "./style/signUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingUpChoice from "../../component/signupChoice";
import HolderSignUp from "../../component/holderSignUp";
import IssuerSignUp from "../../component/issuerSignUp";
import VerifierSignUp from "../../component/verifierSignUp";

const SignUp = ({ user }) => {
  const [way, setWay] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user.type === undefined) {
      setWay("");
    } else {
      navigate("/");
    }
  }, [user.type, navigate]);
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
      <div className="signup--form">
        <Row style={{ height: "inherit" }}>
          <Col span={12} offset={7}>
            <div className="signup--right">
              <div className="signup--canvas">
                {/* first choice holder or company(issuer or verifier) */}
                {renderByway}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
