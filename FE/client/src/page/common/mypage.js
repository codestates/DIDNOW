import { Breadcrumb, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./style/mypage.css";

const Mypage = ({ type }) => {
  const [user, setUser] = useState({});
  const [pageTitle, setPageTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/auth/accesstoken",
      method: "GET",
      withCredentials: true,
    })
      .then((data) => {
        data.data.type === "holder"
          ? setPageTitle(data.data.user.username)
          : setPageTitle(data.data.user.title);
        setUser({
          ...data.data.user,
          password: "",
        });
      })
      .catch(() => {
        console.log("문제발생");
      });
  }, []);

  const onchange = (e) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.id]: e.target.value,
      };
    });
  };

  const updateInfo = (e) => {
    axios({
      url: `http://localhost:9999/api/v1/user/issuer/${user._id}`,
      method: "PUT",
      data: {[type === "holder" ? "username" : "title"] :type === "holder" ? user.username : user.title},
      withCredentials: true,
    }).then((data) => {
      if(data.status === 200) {
        console.log(data);
        message.success("정보 수정 완료!");
        navigate("/");
        navigate(0);
      }
    });
  };
  useEffect(() => {
    console.log(user);
  });
  const emailDOM = (
    <>
      <div>이메일</div>
      <input
        className="mypage--input disabled"
        type="text"
        id="email"
        onChange={onchange}
        value={user.email}
        disabled
      />
    </>
  );
  const titleDOM = (
    <>
      <div>기관명</div>
      <input
        className="mypage--input"
        type="text"
        id="title"
        onChange={onchange}
        value={user.title}
      />
    </>
  );
  const nameDOM = (
    <>
      <div>이름</div>
      <input
        className="mypage--input"
        type="text"
        id="username"
        onChange={onchange}
        value={user.username}
      />
    </>
  );
  const descriptionDOM = (
    <>
      <div>기관 소개</div>
      <input
        className="mypage--input disabled"
        type="text"
        id="description"
        onChange={onchange}
        value={user.desc}
        disabled
      />
    </>
  );

  /*
  const requiredVCDOM = (
    <>
      <div>필수 요구사항</div>
      <input
        className="mypage--input disabled"
        type="text"
        id="requiredVC"
        onChange={onchange}
        value={user.walletAddress}
        disabled
      />
    </>
  );
  */

  // 수정
  const walletAddressDOM = (
    <>
      <div>지갑 주소</div>
      <input
        className="mypage--input disabled"
        type="text"
        id="walletAddress"
        onChange={onchange}
        value={user.walletAddress}
        disabled
      />
    </>
  );

  /*
  const passwordDOM = (
    <>
      <div>비밀번호</div>
      <input
        className="mypage--input"
        type="password"
        id="password"
        onChange={onchange}
        value={user.password}
      />
    </>
  );
  */

  const holderDOM = [nameDOM, emailDOM, walletAddressDOM];
  const issuerDOM = [titleDOM, emailDOM, descriptionDOM];
  const verifierDOM = [titleDOM, emailDOM];

  return (
    <div className="mypage">
      <Breadcrumb className="mypage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/mypage">정보 수정</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mypage--description">{type}의 정보를 수정합니다.</div>

      <div className="mypage--form">
        <Row className="mypage--row">
          <Col span={20} offset={2}>
            <Row>
              <Col span={12} offset={6}>
                <div className="mypage--title">
                  {pageTitle}
                  정보 수정
                </div>
                <hr />
                {type === ""
                  ? ""
                  : type === "holder"
                  ? holderDOM.map((e, idx) => {
                      return <Row key={idx}>{e}</Row>;
                    })
                  : type === "issuer"
                  ? issuerDOM.map((e, idx) => {
                      return <Row key={idx}>{e}</Row>;
                    })
                  : type === "verifier"
                  ? verifierDOM.map((e, idx) => {
                      return <Row key={idx}>{e}</Row>;
                    })
                  : ""}
                <hr style={{ margin: "30px 0 " }} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={9}>
            <button className="mypage--submit" onClick={updateInfo}>
              정보 수정
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Mypage;
