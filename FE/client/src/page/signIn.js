import { Row, Col } from "antd";
import "./style/signin.css";
import signInImage from "../img/signin.jpg";

// signin axios
// plz api endpoint
const signin = () => {};
const SignIn = () => {
  return (
    <div className="signin">
      <Row>
        <Col span={12}>
          <div className="signin--left">
            <img src={signInImage} className="signin--image" alt="" />
          </div>
        </Col>
        <Col span={12}>
          <div className="signin--right">
            <div className="signin--canvas">
              <span className="signin--title">🔐 로그인</span>
              <input type="text" className="signin--id" placeholder="ID" />
              <input
                type="password"
                className="signin--id"
                placeholder="PASSWORD"
              />
              <button className="signin--signinbtn" onClick={signin}>
                로그인
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
