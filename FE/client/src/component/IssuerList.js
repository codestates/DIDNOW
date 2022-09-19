import React, { useState, useEffect } from "react";
import "./style/IssuerList.css";
import { Row, Col, Modal, message } from "antd";
import axios from "axios";

export default function IssuerList({ issuer, issuerUser }) {
  // before render
  useEffect(() => {
  },[])
  // re-render
  useEffect(() => {})
  const [modalOpen, setModalOpen] = useState(false);
  const [VCtitle, setVCTitle] = useState("");
  const [password, setPassword] = useState("");
  const handleOk = async () => {
    const res = await axios({
      url: `http://localhost:9999/api/v1/credential/request-vc/${issuer._id}`,
      method: "POST",
      withCredentials: true,
      data: {
        password: password,
        VC_title: VCtitle,
      },
    });
    setPassword("");
    setModalOpen(false);
    // 홀더가
    if (res.status === 200) {
      message.success("인증서 요청 성공!");
    } else {
      message.error("인증서 요청 실패!");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setPassword("");
  };

  return (
    <Row>
      <Col span={6}>{issuerUser.title || ""}</Col>
      <Col span={6}>{issuerUser.VC_title || ""}</Col>
      <Col span={8}>{issuer?issuer.requiredVC?issuer.requiredVC.join(","):"":""}</Col>
      <Col span={4}>
        <button onClick={() => setModalOpen(true)}>인증서 요청</button>
        <Modal
          style={{ borderRadius: "50px" }}
          title="Request Verification"
          open={modalOpen}
          onCancel={handleCancel}
          requiredVC={issuer?issuer.requiredVC?issuer.requiredVC:"":""}
          width="450px"
          footer={[
            <button key="submit" onClick={handleOk}>
              인증서 요청
            </button>,
            <button key="cancel" onClick={handleCancel}>
              취소
            </button>,
          ]}
        >
          <div className="issuerList--form">
            <div className="issuerList--title">
              {" "}
              아래 정보 제공에 동의합니다.
            </div>
            <div className="issuerList--subtitle">
              정보 제공 항목 :
              <span style={{ fontWeight: "700" }}>
                [ { issuer?issuer.requiredVC?issuer.requiredVC.join(","):"":""} ]
              </span>
            </div>

            <div style={{ width: "100%", padding: "0 10%" }}>
              <div>비밀번호를 입력해주세요</div>
              <div>
                <input
                  className="issuerList--input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
        </Modal>
      </Col>
    </Row>
  );
}
