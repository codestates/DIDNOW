// 인증서 등록이 필요한지
import { Row, Col, Breadcrumb, message } from "antd";
import "./style/holderIssue.css";
import axios from "axios";
import { useState } from "react";
import IssuerList from "../../component/IssuerList";
import "./style/Issuers.css";

import { useEffect } from "react";

const Issuers = () => {
  const [issuers, setIssuers] = useState([]);
  const [holder, setHolder] = useState({});
  // Issuer 정보 불러오기
  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/auth/accesstoken",
      method: "GET",
      withCredentials: true,
    })
      .catch((error) => {})
      .then((data) => {
        if (data.data.type !== "holder") {
          message.error("접근 권한이 없습니다!!");
        }
        setHolder(data.data.user);
      });
    // 모든 issuer 목록을 가져온다.
    // 가져온 issuer 의 id를 이용해서 모든 issueruserList 를 가져온다.
    // 그 중 내 이메일과 일치하는 issueruserlist 를 찾는다.
    // 출력한다.
    axios({
      url: "http://localhost:9999/api/v1/user/issuers",
      method: "GET",
      withCredentials: true,
    })
      .then((result) => {
        setIssuers(result.data);
        axios({
          url: `http://localhost:9999/api/v1/user/issuer-users/${result.data._id}`,
          method: "GET",
          withCredentials: true,
        })})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="holderissue">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/holder/issuerlist">Issuer List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Row className="holderissue--row">
          <Col span={20} offset={2}>
            <div className="holderissue--title">요청할 Issuer 정보</div>
            <hr />

            <Row className="holderissue--row">
              <Col span={6}>기관명</Col>
              <Col span={8}>필수제공 목록</Col>
              <Col span={4}>비고</Col>
            </Row>

            {issuers.map((e,idx) => {
              return <IssuerList key={idx} issuer={e} holder={holder} />
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Issuers;
