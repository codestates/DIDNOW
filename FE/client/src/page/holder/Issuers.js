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
  const [issuerUserList, setIssuerUserList] = useState([]);

  const [user, setUser] = useState({});
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
        setUser(data.data.user);
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
        }).then((data) => {
          // issueruserlist 를 전부 받아왔다.
          // issueruserlist 에 저장된 organizationId 으로 issuers에서 찾아내어 제목을 정한다.
          console.log(data);
          data.data.map((e, idx) => {
            let title = "";
            result.data.map((el, idx) => {
              if (el._id === e.organizationId) {
                title = el.title;
              }
            });
            const newVc = {
              title: title,
              VC_title: data.data.cr_certificateType,
              VC_name: data.data.cr_certificateName,
              VC_type: data.data.cr_certificateType,
              VC_required_info: [],
            };

            setIssuerUserList((prev) => {
              return [...prev, newVc];
            });
          });
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
        <Breadcrumb.Item href="/holder/issuerlist">Issuer List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Row className="holderissue--row">
          <Col span={20} offset={2}>
            <div className="holderissue--title">요청할 Issuer 정보</div>
            <hr />

            <Row className="holderissue--row">
              <Col span={6}>기관명</Col>
              <Col span={6}>인증서 제목</Col>
              <Col span={8}>필수제공 목록</Col>
              <Col span={4}>비고</Col>
            </Row>
            {issuerUserList.map((e, idx) => {
              const issuer = issuers[idx];
              return <IssuerList issuerUser={e} key={idx} issuer={issuer} />;
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Issuers;
