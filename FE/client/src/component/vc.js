import "./style/vc.css";
import logo from "../img/didnow-icon.png";
import { Row, Col, Tooltip, message } from "antd";
import {
  SafetyOutlined,
  FilePdfOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Pdf from "../component/pdf";
import axios from "axios";

const Vc = ({
  issuers,
  data,
  selectedHandle,
  idx,
  user,
  setVcList,
  vcList,
  setSelected,
}) => {
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
    _id: "",
  });
  useEffect(() => {});
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
        _id: data._id || "",
      };
    });
  }, [data, issuers, vc.createdAt, vc.originalVC]);
  const deleteVC = (e) => {
    axios({
      url: `${process.env.REACT_APP_HOLDER}/hol/api/v1/verify/vc-list/${e.currentTarget.id}`,
      method: "DELETE",
      withCredentials: true,
    })
      .then((data) => {
        message.success("삭제 성공");
      })
      .catch(() => {
        message.error("삭제 도중 문제가 발생했습니다.");
      });
    setVcList([
      ...vcList.filter((el, i) => {
        return i.toString() !== e.currentTarget.getAttribute("name");
      }),
    ]);
    setSelected([]);
  };
  return (
    <div className="vc">
      <div
        className="vc--invisible"
        onClick={(e) => selectedHandle(e)}
        id={idx}
      ></div>
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
                <StopOutlined name={idx} id={vc._id} onClick={deleteVC} />
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
