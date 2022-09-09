import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import homePicture from "../img/homepage.jpg";
import "./style/home.css";
const Home = () => {
  return (
    <div className="home">
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "cneter",
          }}
        >
          <ul>
            <li className="main--title">발급 증명, 인증서 관리</li>
            <li className="main--sub--title">
              기업에서 발급한 증명, 인증서를 관리할 수 있습니다.
            </li>
            <li className="main--sub--title">
              본 서비스에서는 개인 혹은 단체에게
            </li>
            <li className="main--sub--title">
              잘못 발급된 증명, 인증서도 삭제가 가능합니다.
            </li>
            <li className="main--sub--title">
              <Link
                style={{ color: "black", textDecoration: "underline" }}
                to="/signin"
              >
                {"📝 Get Start DID NOW!"}
              </Link>
            </li>
          </ul>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "right" }}>
          <img className="main--picture" src={homePicture} alt="" />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
