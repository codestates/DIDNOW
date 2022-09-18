import "./style/verifiervplist.css";
import { Row, Col, Breadcrumb, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifierVPList = () => {
  // navigate
  const navigate = useNavigate();
  // state
  const [user, setUser] = useState({});

  // before render
  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/auth/accesstoken",
      withCredentials: true,
    })
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        if (data.data.type !== "verifier") {
          message("접근 권한이 없습니다!");
          navigate("/");
        }
        setUser(data.data.user);
        axios({
          url: "http://localhost:9999/api/v1/credential/find/request-auths",
          method: "GET",
          withCredentials: true,
        })
          .catch((error) => {
            console.log(error);
          })
          .then((data) => {
            console.log(data);
          });
      });
  }, [navigate]);
  // re-render
  useEffect(() => {});
  return (
    <div className="verifiervplist">
      <Breadcrumb className="verifiervplist--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/verifier/vplist">
          인증 요청 목록
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="verifiervplist--description">
        <div>Holder 가 인증 요청한 목록을 출력합니다.</div>
      </div>

      <div className="verifiervplist--form">
        <Row className="verifiervplist--row">
          <Col span={20} offset={2}>
            <div className="verifiervplist--title">
              [ {user.title || ""} ] Verifier Presentation 목록
            </div>
            <hr />
            <Row>
              <Col span={3}>요청인</Col>
              <Col span={3}>인증서 제목</Col>
              <Col span={10}>VP id</Col>
              <Col span={5}>요청 날짜</Col>
              <Col span={3}>상태</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VerifierVPList;
