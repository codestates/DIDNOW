import "./style/holderSignUp.css";
import { Row, Col, message, DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const HolderSignUp = () => {
  const [issuers, setIssuers] = useState([]);
  useEffect(() => {});
  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/user/issuers",
      method: "GET",
    }).then((data) => {
      setIssuers([...data.data]);
    });
  }, []);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
    birth: "",
    IssuerList: [],
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    userInfo[e.target.id] = e.target.value;
    setUserInfo(userInfo);
  };
  const validate = async () => {
    try {
      if (isCorrect === true) {
        let res = await axios({
          url: `http://localhost:9999/api/v1/auth/register-holder`,
          method: "POST",
          data: {
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            birthDay: userInfo.birth,
            IssuerList: userInfo.IssuerList,
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
      message.error("회원 가입 실패!!");
    }
  };

  const changeDate = (date, dateString) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        birth: dateString,
      };
    });
  };

  const changeIssuerList = (e) => {
    const arr = e.map((el, idx) => {
      const i = issuers.findIndex((ele) => {
        return ele.title === el;
      });
      return issuers[i]._id;
    });
    setUserInfo((prev) => {
      return {
        ...prev,
        IssuerList: arr,
      };
    });
  };

  return (
    <div>
      <div className="holdersignup--title">🙋‍♀️ 개인 회원 가입</div>
      <div className="holdersignup--description">
        <div>개인 회원으로 가입 시 인증서를 직접 관리할 수 있고</div>
        <div>원하는 인증서를 제출하는 서비스를 제공받습니다.</div>
      </div>

      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">이메일</span>
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="email"
            className="holdersignup--input"
            placeholder="holdername@naver.com"
          />
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">비밀번호</span>
        </Col>
        <Col span={18}>
          <input
            type="password"
            onChange={onchange}
            id="password"
            className="holdersignup--input"
          />
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">비밀번호 확인</span>
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
          />
        </Col>
      </Row>

      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">이름</span>
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="username"
            className="holdersignup--input"
            placeholder="김코딩"
          />
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">생년월일</span>
        </Col>
        <Col span={18}>
          <DatePicker
            style={{
              width: "100%",
              borderTop: "0",
              borderBottom: "1px solid black",
              borderLeft: "0",
              borderRight: "0",
            }}
            placeholder="날짜를 선택해주세요."
            onChange={changeDate}
          />
        </Col>
      </Row>

      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">소속 기관</span>
        </Col>
        <Col span={18}>
          <Select
            mode="tags"
            style={{ width: "100%", borderBottom: "1px solid black" }}
            onChange={changeIssuerList}
            placeholder="인증서를 발급 받을 기관을 선택해주세요."
          >
            {issuers.map((e, idx) => {
              return <Option key={e.title}>{e.title}</Option>;
            })}
          </Select>
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <button className="signup--btn" onClick={validate}>
          회원가입 완료
        </button>
      </Row>
    </div>
  );
};

export default HolderSignUp;
