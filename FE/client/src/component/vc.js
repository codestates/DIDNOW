import "./style/vc.css";
import logo from "../img/didnow-icon.png";
import { Row, Col, Tooltip } from "antd";
import {
  SafetyOutlined,
  FilePdfOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Pdf from "../component/pdf";

const Vc = ({ issuers, data, selectedHandle, idx, user }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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

        {vc.organization.length > 10 ? (
          <Tooltip placement="bottom" title={vc.organization}>
            <span className="vc--organization">{`${vc.organization.slice(
              0,
              10
            )}...`}</span>
          </Tooltip>
        ) : (
          <span className="vc--organization">{vc.organization}</span>
        )}

        <div className="vc--content">
          <div style={{ marginBottom: "5px" }}>
            제목 :{" "}
            <b>{Object.keys(data.originalVC[0].vc.credentialSubject)[0]}</b>
          </div>
          <div style={{ marginBottom: "5px" }}>
            내용 : <b>{vc.content}</b>
          </div>
          <div style={{ marginBottom: "5px" }}>
            타입 : <b>{vc.type}</b>
          </div>
        </div>
        <div className="vc--date">
          <div>
            <span>등록 일자 : </span>
            <b>{vc.date}</b>
          </div>
        </div>
        <div className="vc--action">
          <Row style={{ textAlign: "center" }}>
            <Col span={12}>
              <Tooltip placement="top" title={"PDF 다운로드"}>
                <FilePdfOutlined onClick={handlePrint} />
              </Tooltip>
            </Col>
            <Tooltip placement="top" title={"삭제하기"}>
              <Col span={12}>
                <StopOutlined />
              </Col>
            </Tooltip>
          </Row>
        </div>
      </article>
      <div className="vc--pdf--container">
        <div ref={componentRef}>
          <Pdf
            title={Object.keys(data.originalVC[0].vc.credentialSubject)[0]}
            content={vc.content}
            type={vc.type}
            getDate={vc.date}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Vc;
