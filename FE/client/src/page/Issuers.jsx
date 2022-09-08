// 인증서 등록이 필요한지
import { Button, Row, Col, Breadcrumb, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style/holderIssue.css";
import axios from "axios";
import { useState } from "react";
import IssuerList from "../component/IssuerList";
import "./style/Issuers.css";

import { useEffect } from "react";

const fileList = [];
const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  defaultFileList: [...fileList],
};
const Issuers = () => {
  const [issuers, setIssuers] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  // Issuer 정보 불러오기
  useEffect(() => {
    try {
      axios({
        url: "http://localhost:9999/api/v1/user/issuers",
        withCredentials : true,
      }).then((result) => {
        console.log(result);
        setIssuers(result.data);
      });
    } catch (error) {
        console.log(error);
    }
  }, []);

  return (
    <div className="holderissue">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">VC 요청하기</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Row className="holderissue--row">
          <Col span={20} offset={2}>
            <div className="holderissue--title">요청할 Issuer 정보</div>
            <hr />

            <Row className="holderissue--row">
              <div className="title">
                <h3 className="issuerTitle">No</h3>
                <h3 className="issuerTitle">기관명</h3>
                <h3 className="issuerTitle">발급요청</h3>
              </div>
              {issuers.map((item, id) => {
                return (
                  <IssuerList
                    issuer={item}
                    key={id}
                    num = {id}
                    isSelect={isSelect}
                    setIsSelect={setIsSelect}
                  />
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
      
    </div>
  );
};

export default Issuers;
