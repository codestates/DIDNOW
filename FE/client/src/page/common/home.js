import { Link } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import homePicture from "../../img/homepage.jpg";
import issuerPicture from "../../img/signin.jpg";
import verifierPicture from "../../img/signup.jpg";
import "./style/home.css";

const Home = ({ isLoading, type }) => {
  return (
    <Spin spinning={isLoading} size="large">
      <div className="home">
        <Row gutter={20}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "cneter",
            }}
          >
            <ul>
              <li className="main--title">
                {type === ""
                  ? "발급 증명, 인증서 관리"
                  : type === "holder"
                  ? "효율적인 인증서 관리"
                  : type === "issuer"
                  ? "위변조가 불가능한 인증서 발급"
                  : "인증서 통합 관리 서비스"}
              </li>
              {type === "" ? (
                <>
                  <li className="main--sub--title">
                    기업에서 발급한 증명, 인증서를 관리할 수 있습니다.
                  </li>
                  <li className="main--sub--title">
                    본 서비스에서는 개인 혹은 단체에게
                  </li>
                  <li className="main--sub--title">
                    잘못 발급된 증명, 인증서도 삭제가 가능합니다.
                  </li>
                  <li
                    className="main--sub--title"
                    style={{ marginTop: "20px", fontWeight: 700 }}
                  >
                    <Link
                      style={{ color: "black", textDecoration: "underline" }}
                      to="/signin"
                    >
                      {"📝 Get Started DID NOW!"}
                    </Link>
                  </li>
                </>
              ) : type === "holder" ? (
                <>
                  <li className="main--sub--title">
                    DIDNOW는 블록체인 기술을 기반으로
                  </li>
                  <li className="main--sub--title">
                    웹을 통해 신뢰성을 갖추어 기업에서 발급한
                  </li>
                  <li className="main--sub--title">
                    증명서/인증서를 제3자 간섭없이 관리할 수 있습니다.
                  </li>
                </>
              ) : type === "issuer" ? (
                <>
                  <li className="main--sub--title">
                    이제 인증서의 위변조를 걱정하지 않아도 됩니다.
                  </li>
                  <li className="main--sub--title">
                    블록체인을 통해 발급한 인증서의 진위 여부를
                  </li>
                  <li className="main--sub--title">
                    <span style={{ fontWeight: "700" }}>DIDNOW</span>를 통해
                    간단하게 판별할 수 있습니다.
                  </li>
                  <li
                    style={{ margin: "5% 0 0 0" }}
                    className="main--sub--title"
                  >
                    간단한 절차로 사용자에게
                  </li>
                  <li className="main--sub--title">
                    <span style={{ fontWeight: "700" }}>
                      100% 신뢰할 수 있는 인증서
                    </span>
                    를 발급해 줄 수 있습니다.
                  </li>
                </>
              ) : (
                <>
                  <li className="main--sub--title">
                    <span style={{ fontWeight: "700" }}>DIDNOW</span>는 블록체인
                    기술을 활용해 증명서
                  </li>
                  <li className="main--sub--title">
                    자격증 등 다양한 인증서를 한번에 관리할 수 있습니다.
                  </li>
                  <li
                    style={{ margin: "5% 0 0 0" }}
                    className="main--sub--title"
                  >
                    인증서를 검증하고 관리하는데
                  </li>
                  <li className="main--sub--title">
                    복합하고 불필요한 비용을 지불할 필요가 없습니다.
                  </li>
                </>
              )}
            </ul>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "right" }}>
            <img
              className="main--picture"
              src={
                type === "" || type === "holder"
                  ? homePicture
                  : type === "issuer"
                  ? issuerPicture
                  : verifierPicture
              }
              alt=""
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};
export default Home;
