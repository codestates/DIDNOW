import { Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./style/signin.css";
import signInImage from "../img/signin.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = ({ setUser }) => {
  useEffect(() => {});
  const navigate = useNavigate();
  const [type, setType] = useState("holder");
  const [signinObj, setSigninObj] = useState({
    email: "",
    password: "",
  });
  // signin axios
  // plz api endpoint
  const onchange = (e) => {
    signinObj[e.target.id] = e.target.value;
    setSigninObj(signinObj);
  };
  const signin = async () => {
    let res = await axios({
      url: `http://localhost:9999/api/v1/auth/login-${type}`,
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
    setUser(userObj);

    if (res.status === 200) {
      message.info(res.data);
      navigate("/");
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
              <Row>
                <Col
                  span={8}
                  onClick={(e) => {
                    setType(e.target.id);
                  }}
                  style={{cursor : "pointer"}}
                  id="holder"
                >
                  holder
                </Col>
                <Col
                  span={8}
                  onClick={(e) => {
                    setType(e.target.id);
                  }}
                  id="issuer"
                >
                  {" "}
                  issuer
                </Col>
                <Col
                  span={8}
                  onClick={(e) => {
                    setType(e.target.id);
                  }}
                  id="verifier"
                >
                  verifier
                </Col>
              </Row>
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
