import { Row, Col } from "antd";
import {
  UserOutlined,
  BankOutlined,
  SafetyOutlined,
  ShopOutlined,
} from "@ant-design/icons";
const SingUpChoice = ({ type, setType }) => {
  const choice = (e) => {
    setType(e.currentTarget.id);
  };
  return (
    <>
      <div className="signup--title">회원가입</div>
      <Row gutter={70}>
        <Col span={12}>
          <div
            className="signup--choicetype--first"
            onClick={choice}
            id={type === "" ? "holder" : "issuer"}
          >
            {type === "" ? <UserOutlined /> : <SafetyOutlined />}
            <div className="signup--choicetype--title">
              {type === "" ? "개인회원" : "발행자"} 가입하기
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className="signup--choicetype--first"
            onClick={choice}
            id={type === "" ? "company" : "verifier"}
          >
            {type === "" ? <BankOutlined /> : <ShopOutlined />}
            <div className="signup--choicetype--title">
              {type === "" ? "기업회원" : "검증자"} 가입하기
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SingUpChoice;
