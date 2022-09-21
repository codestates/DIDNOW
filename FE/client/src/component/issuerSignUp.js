import "./style/issuerSignUp.css";
import { Row, Col, message, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const IssuerSignUp = () => {
  useEffect(() => {});
  useEffect(() => {}, []);
  const requiredVCList = ["이름", "이메일", "생년월일", "전화번호", "주소"];
  const navigate = useNavigate();
  const [issuerInfo, setIssuerInfo] = useState({
    email: "",
    password: "",
    title: "",
    requiredVC: "",
    desc: "",
    walletAddress: "",
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

  // requiredVC 변경
  const changeRequiredVC = (e) => {
    setIssuerInfo((prev) => {
      return { ...prev, requiredVC: e };
    });
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

      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          이메일
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="email"
            placeholder="issuer@naver.com"
          />
        </Col>
      </Row>
      <Row className="issuersignup--row">
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
      <Row className="issuersignup--row">
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
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          기관명
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="title"
            placeholder="코드스테이츠"
          />
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          필수 요구사항
        </Col>
        <Col span={18}>
          <Select
            mode="tags"
            style={{
              width: "100%",
              borderTop: "0",
              borderLeft: "0",
              borderRight: "0",
              borderBottom: "1px solid black",
            }}
            placeholder="필수적으로 제공 받아야할 정보"
            onChange={changeRequiredVC}
          >
            {requiredVCList.map((e, idx) => {
              return <Option key={e}>{e}</Option>;
            })}
          </Select>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          기관소개
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="desc"
            placeholder="비전공자도 개발이 될 수 있습니다."
          />
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          지갑 주소
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="walletAddress"
            placeholder="klaytn 지갑 주소를 적어주세요."
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
