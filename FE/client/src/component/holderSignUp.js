import "./style/holderSignUp.css";
import { Row, Col, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HolderSignUp = () => {
  useEffect(() => {});
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
    walletAddress: "",
    birth: "",
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    userInfo[e.target.id] = e.target.value;
    setUserInfo(userInfo);
  };
  const validate = async () => {
    if (isCorrect === true) {
      let res = await axios({
        url: `http://localhost:9999/api/v1/auth/register-holder`,
        method: "POST",
        data: {
          email: userInfo.email,
          password: userInfo.password,
          username: userInfo.username,
          walletAddress: userInfo.walletAddress,
          birthDay: userInfo.birth,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.info("회원 가입 완료!");
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div>개인 회원 가입</div>
      <div>개인 회원으로 가입하는 회원분들께서는</div>
      <div>
        인증서를 직접 관리할 수 있고, 원하는 인증서를 제출하는 서비스를
        제공받습니다.
      </div>

      <Row>
        <Col span={6}>이메일</Col>
        <Col span={18}>
          <input type="text" onChange={onchange} id="email" />
        </Col>
      </Row>

      <Row>
        <Col span={6}>비밀번호</Col>
        <Col span={18}>
          <input type="password" onChange={onchange} id="password" />
        </Col>
      </Row>

      <Row>
        <Col span={6}>비밀번호 확인</Col>
        <Col span={18}>
          <input
            type="password"
            onChange={(e) => {
              return e.target.value === userInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>이름</Col>
        <Col span={18}>
          <input type="text" onChange={onchange} id="username" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>지갑 주소</Col>
        <Col span={18}>
          <input type="text" onChange={onchange} id="walletAddress"></input>
        </Col>
      </Row>
      <Row>
        <Col span={6}>생년월일</Col>
        <Col span={18}>
          <input type="text" onChange={onchange} id="birth" placeholder="" />
        </Col>
      </Row>

      <button onClick={validate}>회원가입 완료</button>
    </div>
  );
};

export default HolderSignUp;
