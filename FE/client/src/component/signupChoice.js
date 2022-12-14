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
      <div className="signup--title">π νμκ°μ</div>
      <div className="signup--description">
        <div>μλνμΈμ νΈλ¦¬ν μΈμ¦μ μλΉμ€ DIDNOW μλλ€.</div>
        DIDNOWμ κ°μνμ¬ νΈλ¦¬ν μΈμ¦μ κ΄λ¦¬ μλΉμ€λ₯Ό μ΄μ©ν΄λ³΄μΈμ.
      </div>
      <Row gutter={70}>
        <Col span={12}>
          <div
            className="signup--choicetype--first"
            onClick={choice}
            id={way === "" ? "holder" : "issuer"}
          >
            {way === "" ? <UserOutlined /> : <SafetyOutlined />}
            <div className="signup--choicetype--title">
              {way === "" ? "κ°μΈνμ" : "λ°νμ"} κ°μνκΈ°
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
              {way === "" ? "κΈ°μνμ" : "κ²μ¦μ"} κ°μνκΈ°
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SingUpChoice;
