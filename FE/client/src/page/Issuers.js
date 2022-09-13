// 인증서 등록이 필요한지
import { Row, Col, Breadcrumb } from "antd";
import "./style/holderIssue.css";
import axios from "axios";
import { useState } from "react";
import IssuerList from "../component/IssuerList";
import "./style/Issuers.css";

import { useEffect } from "react";

const Issuers = () => {
  const [issuers, setIssuers] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  // Issuer 정보 불러오기
  useEffect(() => {
    try {
      axios({
        url: "http://localhost:9999/api/v1/user/issuers",
        method: "GET",
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        setIssuers(result.data);
      });

      axios({
        url: "http://localhost:9999/api/v1/credential/get-holder-vc-list",
        method: "GET",
        withCredentials: true,
      }).then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
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
              <Col span={6}>인증서 종류</Col>
              <Col span={6}>인증서 이름</Col>
              <Col span={6}>비고</Col>
            </Row>
            {issuers.map((item, id) => {
              return (
                <IssuerList
                  issuer={item}
                  key={id}
                  num={id}
                  isSelect={isSelect}
                  setIsSelect={setIsSelect}
                />
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Issuers;
