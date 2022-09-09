import { Row, Col, message, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import "./style/signin.css";
import signInImage from "../img/signin.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = ({ setUser, type, setType }) => {
  const navigate = useNavigate();
  const [way, setWay] = useState("holder");
  const [signinObj, setSigninObj] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (type !== "") {
      navigate("/");
    }
  });
  const onchange = (e) => {
    signinObj[e.target.id] = e.target.value;
    setSigninObj(signinObj);
  };

  const changeWay = (e) => {
    setWay(e.target.value);
  };

  const messageInfo = (msg) => {
    message.info(msg);
  };

  const messageError = (msg) => {
    message.error(msg);
  };

  const signin = async () => {
    try {
      let res = await axios({
        url: `http://localhost:9999/api/v1/auth/login-${way}`,
        method: "POST",
        data: {
          email: signinObj.email,
          password: signinObj.password,
        },
        withCredentials: true,
      });

      let userObj = await axios({
        url: `http://localhost:9999/api/v1/auth/accesstoken`,
        method: "GET",
        withCredentials: true,
      });

      if (res.status === 200) {
        messageInfo(res.data);
        console.log(userObj.data);
        setUser(userObj.data);
        setType(way);
        navigate("/");
      }
    } catch (error) {
      messageError("로그인 실패!!");
    }
  };
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
              <Radio.Group
                defaultValue="holder"
                buttonStyle="solid"
                size="large"
              >
                <Row>
                  <Radio.Button value="holder" onClick={changeWay}>
                    Holder
                  </Radio.Button>
                  <Radio.Button value="issuer" onClick={changeWay}>
                    Issuer
                  </Radio.Button>
                  <Radio.Button value="verifier" onClick={changeWay}>
                    Verifier
                  </Radio.Button>
                </Row>
              </Radio.Group>
              <input
                type="text"
                className="signin--id"
                placeholder="EMAIL"
                onChange={onchange}
                id="email"
              />
              <input
                type="password"
                className="signin--id"
                placeholder="PASSWORD"
                onChange={onchange}
                id="password"
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
