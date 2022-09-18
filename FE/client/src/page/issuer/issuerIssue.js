import { Breadcrumb, Row, Col, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style/issuerissue.css";

const IssuerIssue = ({ user, type }) => {
  const [vc, setVc] = useState({
    credentialTitle: "",
    credentialName: "",
    credentialType: "",
  });
  const onchange = (e) => {
    setVc((prevVc) => {
      return {
        ...prevVc,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitVc = () => {
    axios({
      url: "http://localhost:9999/api/v1/credential/verifiable-credential",
      method: "POST",
      data: vc,
      withCredentials: true,
    })
      .then(() => {
        message.success("인증서 등록 성공!!");
        setVc({ credentialName: "", credentialTitle: "", credentialType: "" });
      })
      .catch(() => {
        message.error("인증서 등록 실패!!");
      });
  };
  useEffect(() => {});
  return (
    <div className="issuerissue">
      <Breadcrumb className="issuerissue--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issuerissue">인증서 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issuerissue--description">{`인증서 발급 대상자에게 인증서를 발급할 수 있습니다.`}</div>
      <div className="issuerissue--description">{`※ 인증서 발급 완료 시 발급 대상자에게 자동알림이 가며, 커리어 회원이 아닌 경우 발송이 원활하지 않을 수 있습니다.`}</div>
      <div className="issuerissue--form">
        <Row className="issuerissue--row">
          <Col span={20} offset={2}>
            <div className="issuerissue--title">
              [ {user.title} ] Verifier Credential 등록
            </div>
            <hr />

            <Row className="issuerissue--row">
              <Col span={6}>
                <div>
                  <span className="issuerissue--sub--title">발행기관</span>
                </div>
              </Col>
              <Col span={16}>
                <span className="issuerissue--issuer">
                  {type === "holder" ? user.username : user.title || ""}
                </span>
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="issuerissue--row">
              <Col span={6}>
                <span className="issuerissue--sub--title">인증서 제목</span>
              </Col>
              <Col span={16}>
                <input
                  className="issuerissue--input"
                  type="text"
                  placeholder="e.g) 졸업증명서"
                  id="credentialTitle"
                  onChange={onchange}
                  value={vc.credentialTitle}
                />
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="issuerissue--row">
              <Col span={6}>
                <span className="issuerissue--sub--title">인증서 이름</span>
              </Col>
              <Col span={16}>
                <input
                  className="issuerissue--input"
                  type="text"
                  placeholder="e.g) 블록체인 개발자"
                  id="credentialName"
                  onChange={onchange}
                  value={vc.credentialName}
                />
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="issuerissue--row">
              <Col span={6}>
                <span className="issuerissue--sub--title">인증서 타입</span>
              </Col>
              <Col span={16}>
                <input
                  className="issuerissue--input"
                  type="text"
                  placeholder="e.g) 5기수"
                  id="credentialType"
                  onChange={onchange}
                  value={vc.credentialType}
                />
              </Col>
              <Col span={2}></Col>
            </Row>
            <hr />
            <Row className="issuerissue--sumbit--wrapper">
              <Col span={6} offset={9}>
                <button className="issuerissue--submit" onClick={submitVc}>
                  인증서 제출
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IssuerIssue;
