import { Row, Col, Breadcrumb, Radio } from "antd";
import { useLocation } from "react-router-dom";
import { SafetyOutlined } from "@ant-design/icons";
import "./style/usersubmit.css";

const arr = new Array(5).fill("");
const UserSubmit = () => {
  const location = useLocation();
  const selected = location.state.selected;
  console.log(selected);
  return (
    <div className="usersubmit">
      <Breadcrumb className="usermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/usermanage">인증서 제출</Breadcrumb.Item>
      </Breadcrumb>
      <div className="usersubmit">
        <div className="usersubmit--form">
          <Row className="usersubmit--row">
            <Col span={20} offset={2}>
              <Row>
                <Col span={18}>
                  <div className="usersubmit--title">제출할 인증서 목록</div>
                </Col>
                <Col span={6}>갯수</Col>
              </Row>
              <hr />
            </Col>
          </Row>
          <div className="usersubmit--vclist">
            {arr.map((e) => {
              return (
                <Row className="usersubmit--vc">
                  <Col span={1}>1</Col>
                  <Col span={6}>{new Date().toLocaleString()}</Col>
                  <Col span={2}>
                    <SafetyOutlined />
                  </Col>
                  <Col span={9}>[활동증명서] 코드스테이츠 BEB 05기 수료증</Col>
                  <Col span={6}>코드스테이츠</Col>
                </Row>
              );
            })}
            <Row>
              <Col span={3}>제출 타입</Col>
              <Col span={12}>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}>취업 서류</Radio>
                  <Radio value={2}>증빙 서류</Radio>
                  <Radio value={3}>기타</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={3}>제출할 기업</Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubmit;
