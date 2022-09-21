import "./style/vc.css";
import logo from "../img/didnow-icon.png";
import { Row, Col, Tooltip } from "antd";
import {
  SafetyOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const Vc = ({ issuers, data, selectedHandle, idx }) => {
  const [vc, setVc] = useState({
    organization: "",
    title: "",
    content: "",
    type: "",
    date: "",
  });
  useEffect(() => {
    setVc(() => {
      return {
        organization:
          data.originalVC[0].vc.credentialSubject[
            Object.keys(data.originalVC[0].vc.credentialSubject)[0]
          ].publisher || "",
        title: data.title || "",
        content:
          data.originalVC[0].vc.credentialSubject[
            Object.keys(data.originalVC[0].vc.credentialSubject)[0]
          ].name || "",
        type:
          data.originalVC[0].vc.credentialSubject[
            Object.keys(data.originalVC[0].vc.credentialSubject)[0]
          ].type || "",
        date: data.createdAt.slice(0, 10) || "",
      };
    });
  }, [data, issuers, vc.createdAt, vc.originalVC]);

  return (
    <div className="vc" onClick={(e) => selectedHandle(e)} id={idx}>
      <article>
        {data.status === 1 ? (
          <div className="vc--check font--blue">
            <SafetyOutlined />
          </div>
        ) : (
          <div className="vc--check font--red">
            <SafetyOutlined />
          </div>
        )}

        <div className="vc--title">{vc.title}</div>
        <img className="vc--logo" src={logo} alt="" />
        <span className="vc--organization">{vc.organization}</span>
        <div className="vc--content">
          <div>제목 : {vc.title}</div>
          <div>내용 : {vc.content}</div>
          <div>타입 : {vc.type}</div>
        </div>
        <div className="vc--date">
          <div>
            <span>등록 일자 : </span>
            {vc.date}
          </div>
        </div>
        <div className="vc--action">
          <Row style={{ textAlign: "center" }}>
            <Col span={8}>
              <Tooltip placement="top" title={"미리보기"}>
                <FilePdfOutlined />
              </Tooltip>
            </Col>
            <Col span={8}>
              <Tooltip placement="top" title={"PDF 다운로드"}>
                <DownloadOutlined />
              </Tooltip>
            </Col>
            <Tooltip placement="top" title={"삭제하기"}>
              <Col span={8}>
                <StopOutlined />
              </Col>
            </Tooltip>
          </Row>
        </div>
      </article>
    </div>
  );
};

export default Vc;
