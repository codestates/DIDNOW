import { Row, Col, Breadcrumb, Select, Modal, message } from "antd";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style/holderSubmit.css";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;
const HolderSubmit = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [verifiers, setVerifiers] = useState([]);
  const [verifiersRequired, setVerifiersRequired] = useState("");
  const [verifierId, setVerifierId] = useState("");
  const [password, setPassword] = useState("");
  const handleOk = () => {
    axios({
      url: `http://localhost:9999/api/v1/credential/verifier/request-auth/${verifierId}`,
      method: "POST",
      data: {
        vc_list: [...selected.map((e) => e._id)],
        password: password,
      },
      withCredentials: true,
    }).then(() => {
      message.success("인증서 요청 성공!");
      setPassword("");
      setModalOpen(false);
    });
  };
  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/user/verifiers",
    }).then((data) => {
      setVerifiers([...data.data]);
    });
  }, []);

  useEffect(() => {
    console.log(verifierId);
  });
  const location = useLocation();
  let selected = [];
  if (location.state) {
    if (location.state.selected) {
      selected = [...location.state.selected];
    }
  }

  const changeVerifier = (e) => {
    const idx = verifiers.findIndex((el) => {
      return el.title === e;
    });
    setVerifiersRequired([...verifiers[idx].verifyList]);
    setVerifierId(verifiers[idx]._id);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setPassword("");
  };
  return (
    <div className="holdersubmit">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">인증서 제출</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holdersubmit">
        <div className="holdersubmit--form">
          <Row className="holdersubmit--row">
            <Col span={20} offset={2}>
              <Row>
                <Col span={18}>
                  <div className="holdersubmit--title">제출할 인증서 목록</div>
                </Col>
                <Col span={6}>
                  <Row>
                    <Col span={12}>
                      <div className="holdersubmit--total">
                        총 {selected.length} 개
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
            </Col>
          </Row>
          <div className="holdersubmit--vclist">
            <Row>
              <Col span={2}>번호</Col>
              <Col span={5}>인증일자</Col>
              <Col span={9}>내용</Col>
              <Col span={6}>인증기관</Col>
            </Row>
            {selected.length >= 1 ? (
              selected.map((e, idx) => {
                return (
                  <Row className="holdersubmit--vc" key={idx}>
                    <Col span={2}>{idx + 1}</Col>
                    <Col span={5}>
                      {e.originalVC[0].vc.credentialSubject[
                        Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                      ].typeDate.slice(0, 10)}
                    </Col>
                    <Col span={9}>
                      {`[${
                        Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                      }] ${
                        e.originalVC[0].vc.credentialSubject[
                          Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                        ].publisher
                      } ${
                        e.originalVC[0].vc.credentialSubject[
                          Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                        ].name
                      } ${
                        e.originalVC[0].vc.credentialSubject[
                          Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                        ].type
                      }`}
                    </Col>
                    <Col span={6}>
                      {
                        e.originalVC[0].vc.credentialSubject[
                          Object.keys(e.originalVC[0].vc.credentialSubject)[0]
                        ].publisher
                      }
                    </Col>
                  </Row>
                );
              })
            ) : (
              <>
                <div style={{ fontSize: "1.5rem" }}>
                  선택된 인증서가 없습니다.
                </div>
                <Row>
                  <Link to="/holder/manage">
                    <div style={{ fontSize: "1.5rem" }}>
                      📝 인증서 고르러 가기
                    </div>
                  </Link>
                </Row>
              </>
            )}
            <hr />

            <Row>
              <Col span={3}>제출할 기업</Col>
              <Col span={12}>
                <Select
                  style={{ width: "50%" }}
                  placeholder="제출할 기업을 선택해주세요."
                  onChange={changeVerifier}
                >
                  {verifiers.map((e, idx) => {
                    return <Option key={e.title}>{e.title}</Option>;
                  })}
                </Select>
              </Col>
            </Row>
            {verifiersRequired.length > 0 ? (
              <Row>
                <Col span={3}>제출 요구 사항</Col>
                <Col span={12}>{verifiersRequired.join(",")}</Col>
              </Row>
            ) : (
              ""
            )}
            <Row>
              <Col span={4} offset></Col>
            </Row>
            <hr />
            <Row className="holderissue--regist--container">
              <Col span={2} offset={10}>
                <button
                  className="holderissue--regist"
                  onClick={() => setModalOpen(true)}
                >
                  등록 완료
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
                  <div className="issuerList--form">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolderSubmit;
