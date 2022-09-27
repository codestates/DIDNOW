// 인증서 등록이 필요한지
import { Row, Col, Breadcrumb, message, Spin, Pagination } from "antd";
import "./style/holderIssue.css";
import axios from "axios";
import { useState } from "react";
import IssuerList from "../../component/IssuerList";
import "./style/Issuers.css";

import { useEffect } from "react";

const Issuers = () => {
  const [issuers, setIssuers] = useState([]);
  const [holder, setHolder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  // Issuer 정보 불러오기
  useEffect(() => {});
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
      method: "GET",
      withCredentials: true,
    })
      .then((data) => {
        if (data.data.type !== "holder") {
          message.error("접근 권한이 없습니다!!");
        }
        setHolder(data.data.user);

        axios({
          url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer/find/all`,
          method: "GET",
          withCredentials: true,
        })
          .then((result) => {
            const arr = result.data.filter((e) => {
              const exist =
                data.data.user.IssuerList.indexOf(e._id) >= 0 ? true : false;
              return exist;
            });
            setIssuers(arr);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="holderissue">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/holder/issuerlist">인증서 발급</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Spin spinning={isLoading} tip="로딩중..." size="large">
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
                  <span className="holderissuerlist--columns">
                    필수제공 목록
                  </span>
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

              {issuers
                .filter((e, idx) => {
                  return idx < page * 10 && idx >= (page - 1) * 10;
                })
                .map((e, idx) => {
                  return (
                    <IssuerList
                      key={idx}
                      issuer={e}
                      idx={idx}
                      holder={holder}
                    />
                  );
                })}
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              defaultCurrent={page}
              total={issuers.length}
              onChange={(e) => setPage(e)}
            />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Issuers;
