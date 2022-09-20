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
  const [vpList, setVpList] = useState([]);
  const [holders, setHolders] = useState([]);

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
          message.error("접근 권한이 없습니다!");
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
            setVpList(data.data);
          });
      });
  }, [navigate]);
  // re-render
  useEffect(() => {});

  const verifyVP = (e) => {
    axios({
      url: `http://localhost:9999/api/v1/credential/auth-vp/${e.target.id}`,
      method: "POST",
      withCredentials: true,
    }).then((data) => {
      console.log(data);
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

      <div className="verifiervplist--form">
        <Row className="verifiervplist--row">
          <Col span={20} offset={2}>
            <div className="verifiervplist--title">
              [ {user.title || ""} ] Verifier Presentation 목록
            </div>
            <hr />
            <Row>
              <Col span={5}>요청인</Col>
              <Col span={4}>인증서 제목</Col>
              <Col span={8}>VP id</Col>
              <Col span={5}>요청 날짜</Col>
              <Col span={2}>상태</Col>
            </Row>
            {vpList.map((e, idx) => {
              return (
                <Row key={idx}>
                  <Col span={5}>
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
                  <Col span={8}>{e._id}</Col>
                  <Col span={5}>{e.updatedAt.slice(0, 10)}</Col>
                  <Col span={2}>
                    {e.status === "status" ? (
                      <button onClick={verifyVP} id={e._id}>
                        검증하기
                      </button>
                    ) : e.status === "pending" ? (
                      <div>pending</div>
                    ) : e.status === "success" ? (
                      <div>success</div>
                    ) : (
                      <div>failed</div>
                    )}
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VerifierVPList;
