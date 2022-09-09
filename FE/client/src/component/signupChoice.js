import { Row, Col } from "antd";
import {
  UserOutlined,
  BankOutlined,
  SafetyOutlined,
  ShopOutlined,
} from "@ant-design/icons";
const SingUpChoice = ({ way, setWay }) => {
  const choice = (e) => {
    setWay(e.currentTarget.id);
  };
  return (
    <>
      <div className="signup--title">회원가입</div>
      <Row gutter={70}>
        <Col span={12}>
          <div
            className="signup--choicetype--first"
            onClick={choice}
            id={way === "" ? "holder" : "issuer"}
          >
            {way === "" ? <UserOutlined /> : <SafetyOutlined />}
            <div className="signup--choicetype--title">
              {way === "" ? "개인회원" : "발행자"} 가입하기
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className="signup--choicetype--first"
            onClick={choice}
            id={way === "" ? "company" : "verifier"}
          >
            {way === "" ? <BankOutlined /> : <ShopOutlined />}
            <div className="signup--choicetype--title">
              {way === "" ? "기업회원" : "검증자"} 가입하기
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SingUpChoice;
