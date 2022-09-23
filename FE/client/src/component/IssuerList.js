import React, { useState, useEffect } from "react";
import "./style/IssuerList.css";
import { Row, Col, Modal, Spin } from "antd";
import ModalContent from "./modalContent";

export default function IssuerList({ issuer, idx }) {
  // before render
  useEffect(() => {}, []);
  // re-render
  useEffect(() => {});
  const [modalOpen, setModalOpen] = useState(false);
  const [isOkLoading, setIsOkLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleCancel = () => {
    setModalOpen(false);
    setPassword("");
  };
  return (
    <Row className="issuerlist--row">
      <Col span={2} offset={2} className="issuerlist--col">
        <span style={{ margin: "0 0 0 15%" }}>{idx + 1}</span>
      </Col>
      <Col span={7} className="issuerlist--col">
        {issuer ? issuer.title : ""}
      </Col>
      <Col span={8} className="issuerlist--col">
        {issuer ? (issuer.requiredVC ? issuer.requiredVC.join(",") : "") : ""}
      </Col>
      <Col span={4} className="issuerlist--col">
        <button className="issuerlist--btn" onClick={() => setModalOpen(true)}>
          인증서 발급
        </button>
        <Modal
          style={{ borderRadius: "50px" }}
          title="Request Verification"
          open={modalOpen}
          onCancel={handleCancel}
          requiredVC={issuer ? issuer.requiredVC : ""}
          width="450px"
          footer={[]}
        >
          {isOkLoading ? (
            <Spin size="large" tip="요청중...">
              <ModalContent
                issuer={issuer}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                isOkLoading={isOkLoading}
                setIsOkLoading={setIsOkLoading}
                password={password}
                setPassword={setPassword}
              />
            </Spin>
          ) : (
            <ModalContent
              issuer={issuer}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              isOkLoading={isOkLoading}
              setIsOkLoading={setIsOkLoading}
              password={password}
              setPassword={setPassword}
            />
          )}
        </Modal>
      </Col>
    </Row>
  );
}
