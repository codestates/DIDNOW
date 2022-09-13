import "./style/verifierSignUp.css";
import { Row, Col, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifierSignUp = () => {
  useEffect(() => {});
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const [verifierInfo, setVerifierInfo] = useState({
    email: "",
    password: "",
    title: "",
    requiredVC: "",
    desc: "",
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    verifierInfo[e.target.id] = e.target.value;
    setVerifierInfo(verifierInfo);
  };
  const validate = async () => {
    if (isCorrect === true) {
      let res = await axios({
        url: `http://localhost:9999/api/v1/auth/register-verifier`,
        method: "POST",
        data: {
          email: verifierInfo.email,
          password: verifierInfo.password,
          title: verifierInfo.title,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.info(res.data);
        navigate("/");
      }
    }
  };
  return (
    <div>
      <div className="verifiersignup--title">🧐 검증자 회원 가입</div>
      <div className="verifiersignup--description">
        <div>검증자 회원으로 가입하는 기관 고객분들은</div>
        <div>회원들이 제출한 인증서를 검증할 수 있습니다.</div>
      </div>
      <Row>
        <Col span={6}>이메일</Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="text"
            onChange={onchange}
            id="email"
          />
        </Col>
      </Row>

      <Row>
        <Col span={6}>비밀번호</Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="password"
            onChange={onchange}
            id="password"
          />
        </Col>
      </Row>

      <Row>
        <Col span={6}>비밀번호 확인</Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="password"
            onChange={(e) => {
              return e.target.value === verifierInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>기관명</Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="text"
            onChange={onchange}
            id="title"
          />
        </Col>
      </Row>
      <Row>
        <button className="signup--btn" onClick={validate}>
          가입 완료
        </button>
      </Row>
    </div>
  );
};

export default VerifierSignUp;
