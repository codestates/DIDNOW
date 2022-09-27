import { Row, Col, Modal } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "../img/didnow-icon.png";
import "./style/footerBar.css";
// import axios from "axios";
const FooterBar = () => {
  // const [team, setTeam] = useState([]);
  const info = () => {
    Modal.info({
      title: "This is a notification message",
      width: "800px",
      content: (
        <Row>
          <Col span={4}></Col>
        </Row>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    // axios({
    //   url: "https://api.github.com/users/qudgus9601",
    //   method: "GET",
    // }).then((data) => {
    //   console.log(data.data.avatar_url);
    //   console.log(data.data.name);
    // });
    // axios
    //   .all([
    //     axios.get("https://api.github.com/users/donggni0712"),
    //     axios.get("https://api.github.com/users/qudgus9601"),
    //     axios.get("https://api.github.com/users/tonynotmorty"),
    //     axios.get("https://api.github.com/users/qudgus9601"),
    //   ])
    //   .then(
    //     axios.spread((res1, res2, res3, res4) => {
    //       console.log(res1);
    //       console.log(res2);
    //     })
    //   );
  }, []);

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
          <a href="https://github.com/Vone-DID-Lab">GITHUB</a>
        </div>
        <div
          className="footer--menu"
          onClick={info}
          style={{ cursor: "pointer" }}
        >
          TEAM
        </div>
        <div className="footer--menu">BLOG</div>
      </Col>
      <Col span={4}>
        <div className="footer--subtitle">TERMS</div>
        <div className="footer--menu">PRIVACY POLICY</div>
        <div className="footer--menu">TERMS OF SERVICES</div>
        <div className="footer--menu">LEGAL</div>
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
    </Row>
  );
};

export default FooterBar;
