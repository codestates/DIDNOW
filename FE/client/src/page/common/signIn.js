import { Row, Col, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./style/signin.css";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = ({ type, setType, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (type !== "") {
      navigate("/");
    }
  }, [navigate, type]);

  const [way, setWay] = useState("holder");
  const [signinObj, setSigninObj] = useState({
    email: "",
    password: "",
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
      // login
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
        messageInfo("로그인 성공!");
        const userData = JSON.stringify({
          _id: userObj.data.user._id,
          email: userObj.data.user.email,
          username: userObj.data.user.username,
          walletAddress: userObj.data.user.walletAddress,
          title: userObj.data.user.title,
          desc: userObj.data.user.desc,
          type: userObj.data.type,
        });
        setUser(JSON.parse(userData));
        setType(userObj.data.type);
        navigate(-1);
      }
    } catch (error) {
      messageError("로그인 실패!!");
    }
  };
  return (
    <div className="signin">
      <Row>
        <Col span={12} offset={7}>
          <div className="signin--right">
            <div className="signin--canvas">
              <span className="signin--title">🔐 로그인</span>
              <Radio.Group
                defaultValue="holder"
                buttonStyle="solid"
                size="large"
              >
                <Row className="signin--shadow">
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
              <Row>
                <Col span={6}>
                  <Link to="/signup">회원이 아니신가요?</Link>
                </Col>
              </Row>
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
