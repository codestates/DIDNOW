import React, { useState, useEffect } from "react";
import "./style/IssuerList.css";
import { Row, Col, Modal, message } from "antd";
import axios from "axios";

export default function IssuerList({ issuer, num }) {
  useEffect(() => {});
  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/credential/get-holder-vc-list/",
      method: "GET",
      withCredentials: true,
    }).then((data) => {
      console.log(data);
    });
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  // return (
  //   <>
  //     <div className="content">
  //       <h4 className="issuerContent">{num + 1}</h4>
  //       <h4 className="issuerContent">{issuer._id}</h4>
  //       <h4 className="issuerContent">{issuer.title}</h4>
  //       <button
  //         className="issuerContentButton"
  //         onClick={() => setIsClick(!isClick)}
  //       >
  //         {"인증서 요청"}
  //       </button>
  //       {isClick ? (
  //         <IssuerListModal
  //           issuer={issuer}
  //           isSelect={isClick}
  //           setIsSelect={setIsClick}
  //         />
  //       ) : (
  //         <></>
  //       )}
  //     </div>
  //   </>
  // );
  const handleOk = async () => {
    setModalOpen(false);
    const res = await axios({
      url: `http://localhost:9999/api/v1/credential/request-vc/${issuer._id}`,
      method: "POST",
      withCredentials: true,
      data: {
        password: password,
        VC_title: title,
      },
    });

    // 홀더가
    if (res.status === 200) {
      message.success("인증서 요청 성공!");
    } else {
      message.error("인증서 요청 실패!");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Row>
      <Col span={6}>{issuer.title}</Col>
      <Col span={6}></Col>
      <Col span={6}></Col>
      <Col span={6}>
        <button onClick={() => setModalOpen(true)}>인증서 요청</button>
        <Modal
          title="정보제공 동의"
          open={modalOpen}
          onCancel={handleCancel}
          footer={[
            <button key="submit" onClick={handleOk}>
              인증서 요청
            </button>,
            <button key="cancel" onClick={handleCancel}>
              취소
            </button>,
          ]}
        >
          <div>정보 제공에 동의합니다.</div>
          <div>비밀번호를 입력해주세요</div>
          <div>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
        </Modal>
      </Col>
    </Row>
  );
}
