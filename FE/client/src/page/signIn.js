import { Row, Col } from "antd";
import "./style/signin.css";
import signInImage from "../img/signin.jpg";
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
              <span className="signin--title">LOGIN</span>
              <label className="signin--label">ID</label>
              <input type="text" />
              <label className="signin--label">PASSWORD</label>
              <input type="password" />
              <input type="checkbox" />
              로그인 상태 유지
              <button>로그인</button>
              <Row>
                <Col span={8}>회원가입</Col>
                <Col span={8}>아이디찾기</Col>
                <Col span={8}>비밀번호 찾기</Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
