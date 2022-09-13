import "./style/issuerSignUp.css";
import { Row, Col, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IssuerSignUp = () => {
  useEffect(() => {});
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const [issuerInfo, setIssuerInfo] = useState({
    email: "",
    password: "",
    title: "",
    requiredVC: "",
    desc: "",
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    issuerInfo[e.target.id] = e.target.value;
    setIssuerInfo(issuerInfo);
  };
  const validate = async () => {
    if (isCorrect === true) {
      let res = await axios({
        url: `http://localhost:9999/api/v1/auth/register-issuer`,
        method: "POST",
        data: {
          email: issuerInfo.email,
          password: issuerInfo.password,
          title: issuerInfo.title,
          requiredVC: [issuerInfo.requiredVC],
          desc: issuerInfo.desc,
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
      <div className="issuersignup--title">📝 발행자 회원 가입</div>
      <div className="issuersignup--description">
        <div>발행자 회원으로 가입하는 기관 고객분들은</div>
        <div>
          회원들이 등록받을 인증서를 직접 관리할 수 있습니다.
          <div> 인증서를 블록체인에등록할 수 있습니다.</div>
        </div>
      </div>

      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          이메일
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="email"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          비밀번호
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="password"
            onChange={onchange}
            id="password"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          비밀번호 확인
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="password"
            onChange={(e) => {
              return e.target.value === issuerInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          기관명
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="title"
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          requiredVC
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="requiredVC"
          ></input>
        </Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
        <Col span={6} className="signup--col">
          기관소개
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="desc"
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

export default IssuerSignUp;
