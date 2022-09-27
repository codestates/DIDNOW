import "./style/verifierSignUp.css";
import { Row, Col, message, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const VerifierSignUp = () => {
  useEffect(() => {});
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const requiredVerifyList = [
    "졸업증명서",
    "출입국증명서",
    "성인인증서",
    "수료증",
  ];
  const [verifierInfo, setVerifierInfo] = useState({
    email: "",
    password: "",
    title: "",
    verifyList: [],
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    verifierInfo[e.target.id] = e.target.value;
    setVerifierInfo(verifierInfo);
  };
  const validate = async () => {
    if (verifierInfo.email === "") {
      message.error("이메일을 입력해주세요.");
    } else if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        verifierInfo.email
      )
    ) {
      message.error("이메일을 주소 형식을 확인해주세요.");
    } else if (verifierInfo.password === "") {
      message.error("비밀번호를 입력해주세요.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
        verifierInfo.password
      )
    ) {
      message.error("비밀번호를 형식에 맞춰 정확히 입력해주세요.");
    } else if (!isCorrect) {
      message.error("비밀번호 확인이 일치하지 않습니다");
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/.test(verifierInfo.title)) {
      message.error("기관명을 정확히 입력해주세요.");
    } else if (verifierInfo.verifyList.length < 1) {
      message.error("1개 이상의 인증 요구사항을 선택해주세요.");
    } else {
      let res = await axios({
        url: `${process.env.REACT_APP_AUTH}/aut/api/v1/register-verifier`,
        method: "POST",
        data: {
          email: verifierInfo.email,
          password: verifierInfo.password,
          title: verifierInfo.title,
          verifyList: verifierInfo.verifyList,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.success(res.data);
        navigate("/home");
      }
    }
  };

  const changeRequiredVC = (e) => {
    setVerifierInfo((prev) => {
      return {
        ...prev,
        verifyList: [...e],
      };
    });
  };

  return (
    <div>
      <div className="verifiersignup--title">🧐 검증자 회원 가입</div>
      <div className="verifiersignup--description">
        <div>검증자 회원으로 가입하는 기관 고객분들은</div>
        <div>회원들이 제출한 인증서를 검증할 수 있습니다.</div>
      </div>
      <Row className="verifiersignup--row">
        <Col span={6}>
          <span className="signup--label">이메일</span>
        </Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="text"
            onChange={onchange}
            id="email"
            placeholder="verifier@didnow.com"
          />
        </Col>
      </Row>

      <Row className="verifiersignup--row">
        <Col span={6}>
          <span className="signup--label">비밀번호</span>
        </Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="password"
            onChange={onchange}
            id="password"
          />
        </Col>
      </Row>

      <Row className="verifiersignup--row">
        <Col span={6}>
          <span className="signup--label">비밀번호 확인</span>
        </Col>
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
      <Row className="verifiersignup--row">
        <Col span={6}>
          <span className="signup--label">기관명</span>
        </Col>
        <Col span={18}>
          <input
            className="verifiersignup--input"
            type="text"
            onChange={onchange}
            id="title"
            placeholder="DIDNOW"
          />
        </Col>
      </Row>
      <Row className="verifiersignup--row">
        <Col span={6}>
          <span className="signup--label">필수 인증내용</span>
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
            placeholder="필요한 인증 사항"
            onChange={changeRequiredVC}
          >
            {requiredVerifyList.map((e, idx) => {
              return <Option key={e}>{e}</Option>;
            })}
          </Select>
        </Col>
      </Row>
      <Row className="verifiersignup--row">
        <button className="signup--btn" onClick={validate}>
          가입 완료
        </button>
      </Row>
    </div>
  );
};

export default VerifierSignUp;
