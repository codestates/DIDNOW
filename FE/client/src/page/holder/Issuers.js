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
      url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
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
      url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer/find/all`,
      method: "GET",
      withCredentials: true,
    })
      .then((result) => {
        setIssuers(result.data);
        axios({
          url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer-user/all/${result.data._id}`,
          method: "GET",
          withCredentials: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="holderissue">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/holder/issuerlist">인증서 발급</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Row className="holderissue--row">
          <Col span={20} offset={2}>
            <div className="issuerlist--title">발급할 Issuer 정보</div>
            <hr />

            <Row className="holderissuerlist--row">
              <Col span={2} offset={2}>
                <span className="holderissuerlist--columns">번호</span>
              </Col>
              <Col span={7}>
                <span className="holderissuerlist--columns">기관명</span>
              </Col>
              <Col span={8}>
                <span className="holderissuerlist--columns">필수제공 목록</span>
              </Col>
              <Col span={3}>
                <span
                  className="holderissuerlist--columns"
                  style={{ justifyContent: "center" }}
                >
                  발급
                </span>
              </Col>
            </Row>
            <hr />

            {issuers.map((e, idx) => {
              return (
                <IssuerList key={idx} issuer={e} idx={idx} holder={holder} />
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col offset={11}>pagination 들어갈 자리</Col>
        </Row>
      </div>
    </div>
  );
};

export default Issuers;
