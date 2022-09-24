import { Row, Col, Breadcrumb, Modal } from "antd";
import "./style/verifiers.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Verifiers = () => {
  // states
  // verifier list 목록을 담을 상태 변수
  const [verifierList, setVerifierList] = useState([]);

  // modal toggle 을 위한 상태
  const [modalOpen, setModalOpen] = useState(false);

  // modal 에서 입력받을 비밀번호를 담을 상태
  const [password, setPassword] = useState("");

  // before-render
  useEffect(() => {
    axios({
      url: "/api/v1/user/verifiers",
      withCredentials: true,
    }).then((data) => {
      console.log(data.data);
      setVerifierList(data.data);
    });
  }, []);
  // re-render
  useEffect(() => {});

  const handleOk = (e) => {
    setPassword(e.target.value);
    setModalOpen(false);
  };

  const handleCancel = (e) => {
    setPassword(e.target.value);
    setModalOpen(false);
  };
  return (
    <div className="verifiers">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">Verifier List</Breadcrumb.Item>
      </Breadcrumb>

      <div className="verifiers--form">
        <Row className="verifiers--row">
          <Col span={20} offset={2}>
            <div className="verifiers--title">DIDNOW Verfier 목록 </div>
            <hr />

            <Row>
              <Col span={8}>기관명</Col>
              <Col span={12}>인증 요청 사항</Col>
              <Col span={4}>비고</Col>
            </Row>
            <hr />
            {verifierList.map((e, idx) => {
              // 여기 수정 들어가야함.
              if (idx === 0) {
                return (
                  <Row key={idx}>
                    <Col span={8}>{e.title}</Col>
                    <Col span={12}>{e.verifyList.join(",")}</Col>
                    <Col span={4}>
                      <button
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        인증 요청
                      </button>
                      <Modal
                        style={{ borderRadius: "50px" }}
                        title="Request Verification"
                        open={modalOpen}
                        onCancel={handleCancel}
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
                        <div className="verifiersmodal--form">
                          <div className="verifiersmodal--innerform">
                            <Row>
                              <Col span={8}>VC타이틀</Col>
                              <Col span={8}>발급일자</Col>
                              <Col span={8}>비고</Col>
                            </Row>
                            <hr />
                            {/* 
                                VC List가 들어가야한다.
                            */}
                          </div>
                          <div style={{ width: "100%", padding: "0 10%" }}>
                            <div>비밀번호를 입력해주세요</div>
                            <div>
                              <input
                                className="verifiersmodal--input"
                                type="password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                value={password}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </Col>
                  </Row>
                );
              }
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Verifiers;
