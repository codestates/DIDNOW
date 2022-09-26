import "./style/verifiervplist.css";
import { Row, Col, Breadcrumb, message, Spin } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifierVPList = () => {
  // navigate
  const navigate = useNavigate();
  // state
  const [user, setUser] = useState({});
  const [vpList, setVpList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // before render
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
      withCredentials: true,
    })
      .catch((error) => {})
      .then((data) => {
        if (data.data.type !== "verifier") {
          message.error("접근 권한이 없습니다!");
          navigate("/");
        }
        setUser(data.data.user);
        axios({
          url: `${process.env.REACT_APP_VERIFIER}/ver/api/v1/verify/find/all`,
          method: "GET",
          withCredentials: true,
        })
          .catch((error) => {})
          .then((data) => {
            setVpList(data.data);
            setIsLoading(false);
          });
      });
  }, [navigate]);
  // // re-render
  // useEffect(() => {
  //   console.log(vpList);
  // });

  const verifyVP = (e) => {
    axios({
      url: `${process.env.REACT_APP_VERIFIER}/ver/api/v1/verify/close-vp/${e.target.id}`,
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      result.status === 200 && message.success("인증에 성공했습니다");
      window.location.replace("/verifier/vplist");
    });
  };
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

      <Spin tip="VP List 를 불러오는 중..." size="large" spinning={isLoading}>
        <div className="verifiervplist--form">
          <Row className="verifiervplist--row">
            <Col span={20} offset={2}>
              <div className="verifiervplist--title">
                [ {user.title || ""} ] Verifier Presentation 목록
              </div>
              <hr />
              <Row className="holderissuerlist--row">
                <Col span={2}>
                  <span className="holderissuerlist--columns">번호</span>
                </Col>
                <Col span={4}>
                  <span className="holderissuerlist--columns">요청인</span>
                </Col>
                <Col span={4}>
                  <span className="holderissuerlist--columns">인증서 제목</span>
                </Col>
                <Col span={7}>
                  <span className="holderissuerlist--columns">VP id</span>
                </Col>
                <Col span={5}>
                  <span className="holderissuerlist--columns">요청 날짜</span>
                </Col>
                <Col span={2}>
                  <span className="holderissuerlist--columns">상태</span>
                </Col>
              </Row>
              {vpList.map((e, idx) => {
                return (
                  <Row className="issuerlist--row" key={idx}>
                    <Col span={2}>
                      <span style={{ margin: "0 0 0 10px" }}>{idx + 1}</span>
                    </Col>
                    <Col span={4}>
                      {
                        e.originalVP[0].vp.verifiableCredential[0].vc
                          .credentialSubject[
                          Object.keys(
                            e.originalVP[0].vp.verifiableCredential[0].vc
                              .credentialSubject
                          )[0]
                        ].userName
                      }
                    </Col>
                    <Col span={4}>
                      {
                        e.originalVP[0].vp.verifiableCredential[0].vc
                          .credentialSubject[
                          Object.keys(
                            e.originalVP[0].vp.verifiableCredential[0].vc
                              .credentialSubject
                          )[0]
                        ].name
                      }
                    </Col>
                    <Col span={7}>{e._id}</Col>
                    <Col span={5}>{e.updatedAt.slice(0, 10)}</Col>
                    <Col span={2}>
                      {e.status === "status" ? (
                        <button
                          className="verifiervplist--pending"
                          onClick={verifyVP}
                          id={e._id}
                        >
                          검증하기
                        </button>
                      ) : e.status === "success" ? (
                        <div className="verifiervplist--success">success</div>
                      ) : (
                        <div className="verifiervplist--failed">failed</div>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default VerifierVPList;
