import { Row, Col } from "antd";
import "./style/signup.css";
import signUpImage from "../img/signup.jpg";
const SignUp = () => {
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
              <span className="signup--title">SIGNUP</span>
              <Row>
                <Col span={12}></Col>
                <Col span={12}></Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
