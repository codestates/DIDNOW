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

const Vc = ({ data, selectedHandle, idx }) => {
  const [vc, setVc] = useState({});
  useEffect(() => {
    setVc(data);
  }, [data]);
  return (
    <div className="vc" onClick={(e) => selectedHandle(e)} id={idx}>
      <article>
        {data.status === 1 ? (
          <div className="vc--check font--red">
            <SafetyOutlined />
          </div>
        ) : (
          <div className="vc--check font--blue">
            <SafetyOutlined />
          </div>
        )}

        <img className="vc--logo" src={logo} alt="" />
        <span className="vc--organization">{vc.issuedBy}</span>
        <div className="vc--title">{vc.credentialTitle}</div>
        <div className="vc--date">
          <div>
            <span>등록 일자 : </span>
            {vc.createdAt}
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
