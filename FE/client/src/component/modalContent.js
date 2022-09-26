import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import axios from "axios";

const ModalContent = ({
  issuer,
  modalOpen,
  setModalOpen,
  setIsOkLoading,
  password,
  setPassword,
}) => {
  const [title, setTitle] = useState("");
  // before render
  useEffect(() => {}, []);
  // re-render
  useEffect(() => {});
  const handleOk = () => {
    setIsOkLoading(true);
    setPassword("");
    if (title !== "" && password !== "") {
      axios({
        url: `${process.env.REACT_APP_HOLDER}/hol/api/v1/verify/request/${issuer._id}`,
        method: "POST",
        withCredentials: true,
        data: {
          password: password,
          VC_title: title,
        },
      })
        .then((data) => {
          message.success("인증서 요청 성공!");
          setIsOkLoading(false);
          setModalOpen(false);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            message.error("비밀번호가 불일치합니다.");
            setIsOkLoading(false);
          } else {
            message.error("발급 불가능한 인증서입니다.");
            setIsOkLoading(false);
          }
        });
    } else if (title === "") {
      setIsOkLoading(false);
      message.error("인증서 이름을 입력해주세요.");
    } else if (password === "") {
      setIsOkLoading(false);
      message.error("비밀번호를 입력해주세요.");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setPassword("");
  };

  return (
    <>
      <div className="issuerList--form">
        <div className="issuerList--title"> 아래 정보 제공에 동의합니다.</div>
        <div className="issuerList--subtitle">
          정보 제공 항목 :
          <span style={{ fontWeight: "700" }}>
            [{" "}
            {issuer
              ? issuer.requiredVC
                ? issuer.requiredVC.join(",")
                : ""
              : ""}{" "}
            ]
          </span>
        </div>

        <div style={{ width: "100%", padding: "0 10%" }}>
          <div>저장할 인증서 이름을 입력해주세요</div>
          <div style={{ margin: "0 0 20px 0" }}>
            <input
              className="issuerList--input"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
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
              value={password}
            ></input>
          </div>
        </div>
      </div>
      <Row style={{ justifyContent: "center", margin: "10px 0 0 0" }}>
        <Col span={6}>
          <button className="issuerlist--btn" key="submit" onClick={handleOk}>
            인증서 요청
          </button>
        </Col>
        <Col span={6}>
          <button
            className="issuerlist--btn"
            style={{ backgroundColor: "#777777" }}
            key="cancel"
            onClick={handleCancel}
          >
            취소
          </button>
        </Col>
      </Row>
    </>
  );
};

export default ModalContent;
