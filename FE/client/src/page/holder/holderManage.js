import { Breadcrumb, Row, Col, Modal, Select, message, Spin } from "antd";
import "./style/holderManage.css";
import Vc from "../../component/vc";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const HolderManage = () => {
  const [vcList, setVcList] = useState([{}]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [issuers, setIssuers] = useState([]);
  const [verifiers, setVerifiers] = useState([]);
  const [verifier, setVerifier] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/auth/accesstoken",
      method: "GET",
      withCredentials: true,
    }).then((data) => {
      setUser(data.data.user);
    });
    axios({
      url: `${process.env.REACT_APP_HOLDER}/hol/api/v1/verify/vc-list`,
      method: "GET",
      withCredentials: true,
    }).then((vcListOfHolder) => {
      setVcList(vcListOfHolder.data.reverse());
      axios({
        url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer/find/all`,
        method: "GET",
        withCredentials: true,
      }).then((data) => {
        setIssuers(data.data);
      });
      setIsLoading(false);
    });

    axios({
      url: `${process.env.REACT_APP_VERIFIER}/ver/api/v1/verifier/find/all`,
      withCredentials: true,
    }).then((data) => {
      setVerifiers([...data.data]);
    });
  }, []);

  useEffect(() => {});

  const selectedHandle = (e) => {
    if (selected.indexOf(e.currentTarget.id) >= 0) {
      // 만약 있으면 뺀다.
      e.currentTarget.classList.remove("vc--selected");
      setSelected(selected.filter((el) => el !== e.currentTarget.id));
    } else {
      e.currentTarget.classList.add("vc--selected");
      setSelected([e.currentTarget.id, ...selected]);
    }
  };

  const handleCancel = () => {
    setVerifier({});
    setModalOpen(false);
    setPassword("");
  };

  const handleOk = () => {
    if (Object.keys(verifier).length === 0) {
      message.error("제출할 기업을 선택해주세요.");
    } else if (password === "") {
      message.error("비밀번호를 입력해주세요.");
    } else {
      setSubmitLoading(true);
      const arr = vcList
        .filter((e, idx) => idx in selected)
        .map((e, i) => e._id);
      axios({
        url: `${process.env.REACT_APP_HOLDER}/hol/api/v1/verify/request-auth/${verifier}`,
        method: "POST",
        data: {
          password: password,
          vc_list: [...arr],
        },
        withCredentials: true,
      })
        .then((data) => {
          setVerifier({});
          setPassword("");
          setSubmitLoading(false);
          setModalOpen(false);
          message.success("인증서 제출 성공.");
        })
        .catch((error) => {
          if (error.response.data.status === 400) {
            message.error("비밀번호를 틀렸습니다.");
            setSubmitLoading(false);
          }
        });
    }
  };

  return (
    <div className="holdermanage">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">인증서 관리</Breadcrumb.Item>
      </Breadcrumb>
      {isLoading === false ? (
        <>
          <div className="holdermanage--description">
            <div>여러분의 증명, 인증서를 확인 및 다운로드 할 수 있습니다.</div>
            <div>
              기관에서 등록한 인증서는
              <span style={{ color: "red", fontWeight: "700" }}>빨간색</span>
              으로 표시됩니다.
            </div>
          </div>
          <Row className="holdermanage--total">
            <Col span={10}>
              <div className="holdermanage--total--label">{`블록체인에 등록된 인증서 ${vcList.length} 개`}</div>
            </Col>
            <Col span={10}>
              {selected.length >= 1 ? (
                <>
                  <div
                    className="holdermanage--submit--label"
                    onClick={() => {
                      return setModalOpen(true);
                    }}
                  >
                    선택된 {selected.length}개의 인증서 제출하기
                  </div>

                  <Modal
                    style={{ borderRadius: "50px" }}
                    title="인증서 제출"
                    open={modalOpen}
                    onCancel={handleCancel}
                    width="50%"
                    footer={[]}
                  >
                    <Spin size="large" tip="요청중..." spinning={submitLoading}>
                      <Row>
                        <Col span={12} offset={6}>
                          <div style={{ height: "2rem", marginBottom: "20px" }}>
                            특정 기업에 제출하여 인증서를 검증받을 수 있습니다.
                          </div>
                          <div>
                            <div style={{ fontSize: "1rem", height: "1.5rem" }}>
                              제출할 기업을 선택해주세요.
                            </div>
                            <Select
                              style={{
                                width: "100%",
                                border: "1px solid black",
                                borderRadius: "5px",
                                margin: "0 0 5% 0",
                              }}
                              placeholder="제출할 기업을 선택해주세요."
                              value={verifier}
                              onChange={(e) => setVerifier(e)}
                            >
                              {verifiers.map((e, idx) => {
                                return <Option key={e._id}>{e.title}</Option>;
                              })}
                            </Select>
                          </div>
                          {/* 모달창을 열고, verifier가 선택되어야만 렌더링 */}
                          {Object.keys(verifier).length > 0 ? (
                            <>
                              <div
                                style={{ fontSize: "1rem", height: "1.5rem" }}
                              >
                                제출이 필요한 목록
                              </div>
                              <div className="holdermanage--submitlist">
                                {modalOpen
                                  ? verifiers[
                                      verifiers.findIndex((el) => {
                                        return el._id === verifier;
                                      })
                                    ].verifyList.map((e, idx) => {
                                      return (
                                        <>
                                          <Row style={{ margin: "10px 0" }}>
                                            <Col span={21}>{`${
                                              idx + 1
                                            }. ${e}`}</Col>
                                            <Col span={3}>
                                              {/* 만약 verifyList에 selected 한것들이 전부 존재한다면 */}
                                            </Col>
                                          </Row>
                                          <hr />
                                        </>
                                      );
                                    })
                                  : "" || ""}
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div style={{ width: "100%", margin: "5% 0 0 0" }}>
                            <div style={{ fontSize: "1rem" }}>
                              비밀번호를 입력해주세요
                            </div>
                            <div>
                              <input
                                className="holdermanage--input"
                                type="password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                value={password}
                              ></input>
                            </div>
                          </div>

                          <Row
                            style={{
                              justifyContent: "center",
                              margin: "10px 0 0 0",
                            }}
                            gutter={10}
                          >
                            <Col span={12}>
                              <button
                                className="holdermanage--btn"
                                key="submit"
                                onClick={handleOk}
                              >
                                인증서 요청
                              </button>
                            </Col>
                            <Col span={12}>
                              <button
                                className="holdermanage--btn"
                                style={{ backgroundColor: "#777777" }}
                                key="cancel"
                                onClick={handleCancel}
                              >
                                취소
                              </button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Spin>
                  </Modal>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <div className="holdermanage--vc">
            <Row gutter={48}>
              {vcList.length > 0 ? (
                vcList.map((e, i) => {
                  return (
                    <Col key={i} span={6} style={{ margin: "0 0 30px 0" }}>
                      <Vc
                        data={e}
                        selected={selected}
                        selectedHandle={selectedHandle}
                        idx={i}
                        issuers={issuers}
                        user={user}
                      />
                    </Col>
                  );
                })
              ) : (
                <>
                  <div style={{ fontSize: "1.5rem" }}>
                    등록된 인증서가 없습니다.
                  </div>
                  <div style={{ fontSize: "1.5rem" }}>
                    <Link to="/holder/issuerlist">📝 인증서 등록하러 가기</Link>
                  </div>
                </>
              )}
            </Row>
          </div>
          {/* pagination 은 따로 구현해야 할듯 쓸만한거 없음 */}
        </>
      ) : (
        <Row style={{ margin: "200px 0 0 400px" }}>
          <Spin
            spinning={isLoading}
            tip="인증서 불러오는 중..."
            size="large"
          ></Spin>
        </Row>
      )}
    </div>
  );
};

export default HolderManage;
