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
    try {
      const YYYY = userInfo.birth.slice(0, 4);
      const MM = userInfo.birth.slice(4, 6);
      const DD = userInfo.birth.slice(6);
      const birth = `${YYYY}-${MM}-${DD}`;

      if (isCorrect === true) {
        let res = await axios({
          url: `http://localhost:9999/api/v1/auth/register-holder`,
          method: "POST",
          data: {
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            walletAddress: userInfo.walletAddress,
            birthDay: birth,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          message.info("회원 가입 완료!");
          navigate("/");
        }
      } else {
        message.error("비밀번호를 동일하게 입력해주세요.");
      }
    } catch (error) {
      console.log("fail");
      message.error("회원 가입 실패!!");
    }
  };

  return (
    <div>
      <div className="holdersignup--title">🙋‍♀️ 개인 회원 가입</div>
      <div className="holdersignup--description">
        <div>개인 회원으로 가입 시 인증서를 직접 관리할 수 있고</div>
        <div>원하는 인증서를 제출하는 서비스를 제공받습니다.</div>
      </div>

      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          이메일
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="email"
            className="holdersignup--input"
            placeholder="e.g) holdername@naver.com"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          비밀번호
        </Col>
        <Col span={18}>
          <input
            type="password"
            onChange={onchange}
            id="password"
            className="holdersignup--input"
            placeholder="e.g) ●●●●●●"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          비밀번호 확인
        </Col>
        <Col span={18}>
          <input
            type="password"
            onChange={(e) => {
              return e.target.value === userInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
            className="holdersignup--input"
            placeholder="e.g) ●●●●●●"
          />
        </Col>
      </Row>

      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          이름
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="username"
            className="holdersignup--input"
            placeholder="e.g) 김코딩"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          지갑 주소
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="walletAddress"
            className="holdersignup--input"
            placeholder="e.g) 0xwalletAddress20221010plzkaikas"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} style={{ display: "flex" }}>
          생년월일
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="birth"
            placeholder="e.g) YYYYMMDD"
            className="holdersignup--input"
          />
        </Col>
      </Row>
      <Row>
        <button className="signup--btn" onClick={validate}>
          회원가입 완료
        </button>
      </Row>
    </div>
  );
};

export default HolderSignUp;
