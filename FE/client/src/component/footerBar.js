import { Row, Col, Modal } from "antd";

import { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../img/didnow-icon.png";
import "./style/footerBar.css";
import axios from "axios";
import { GithubOutlined } from "@ant-design/icons";
const FooterBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [odj, setodj] = useState({});
  const [hys, sethys] = useState({});
  const [abh, setabh] = useState({});

  const teamOpen = () => {
    setModalOpen(true);
    axios
      .all([
        axios.get("https://api.github.com/users/donggni0712"),
        axios.get("https://api.github.com/users/ysheokorea"),
        axios.get("https://api.github.com/users/qudgus9601"),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setodj({ ...res1.data });
          sethys({ ...res2.data });
          setabh({ ...res3.data });
          // console.log(res2);
        })
      );
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
  return (
    <Row className="footer--wrapper">
      <Col span={4}>
        <Link to="/">
          <img src={icon} alt="" className="footer--logo" />
        </Link>
      </Col>
      <Col span={4}>
        <div className="footer--subtitle">
          <Link to="/">DIDNOW</Link>
        </div>
        <div className="footer--menu">
          <button
            onClick={() =>
              window.open("https://github.com/Vone-DID-Lab", "_blank")
            }
          >
            GITHUB
          </button>
        </div>
        <div
          className="footer--menu"
          onClick={() => teamOpen()}
          style={{ cursor: "pointer" }}
        >
          TEAM
        </div>
      </Col>
      <Col span={4}>
        <div className="footer--subtitle">TERMS</div>
      </Col>
      <Col span={4}>
        <div className="footer--subtitle">SERVICE</div>
        <div className="footer--menu">APIs</div>
        <div className="footer--menu">DATA</div>
      </Col>
      <Col span={4}></Col>
      <Col span={4}>
        <div className="footer--menu">Copyright2022.</div>
        <div className="footer--menu">DIDNOW All rights reserved.</div>
      </Col>
      <Modal
        title="DIDNOW TEAM"
        width={"50%"}
        open={modalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Row>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "700",
                margin: "0 0 5% 0",
              }}
            >
              TEAM LEADER
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={odj.avatar_url} alt="" style={{ width: "60%" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
                margin: "5% 0 0 0",
              }}
            >
              오동재
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              {odj.name}
            </div>

            <button
              style={{
                margin: "5% 0 0 0",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "700",
                alignItems: "center",
              }}
              onClick={() =>
                window.open("https://github.com/donggni0712", "_blank")
              }
            >
              <GithubOutlined />
              {`\u00A0`}GITHUB
            </button>
          </Col>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "700",
                margin: "0 0 5% 0",
              }}
            >
              BACK-END
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={hys.avatar_url}
                alt=""
                style={{
                  width: "60%",
                  borderRadius: "50%",
                  border: "2px solid black",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
                margin: "5% 0 0 0",
              }}
            >
              허윤석
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              {hys.name}
            </div>
            <button
              style={{
                margin: "5% 0 0 0",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "700",
                alignItems: "center",
              }}
              onClick={() =>
                window.open("https://github.com/ysheokorea", "_blank")
              }
            >
              <GithubOutlined />
              {`\u00A0`}GITHUB
            </button>
          </Col>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "700",
                margin: "0 0 5% 0",
              }}
            >
              FRONT-END
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={abh.avatar_url}
                alt=""
                style={{
                  width: "60%",
                  borderRadius: "50%",
                  border: "2px solid black",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
                margin: "5% 0 0 0",
              }}
            >
              안병현
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              {abh.name}
            </div>
            <button
              style={{
                margin: "5% 0 0 0",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "700",
                alignItems: "center",
              }}
              onClick={() =>
                window.open("https://github.com/qudgus9601", "_blank")
              }
            >
              <GithubOutlined />
              {`\u00A0`}GITHUB
            </button>
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};

export default FooterBar;
