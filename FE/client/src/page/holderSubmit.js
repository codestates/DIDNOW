import { Row, Col, Breadcrumb, Radio } from "antd";
import { useLocation } from "react-router-dom";
import { SafetyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style/holderSubmit.css";

const HolderSubmit = () => {
  const location = useLocation();
  console.log(location.state);
  let selected = [];
  if (location.state) {
    if (location.state.selected) {
      selected = [...location.state.selected];
    }
  }
  return (
    <div className="holdersubmit">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">인증서 제출</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holdersubmit">
        <div className="holdersubmit--form">
          <Row className="holdersubmit--row">
            <Col span={20} offset={2}>
              <Row>
                <Col span={18}>
                  <div className="holdersubmit--title">제출할 인증서 목록</div>
                </Col>
                <Col span={6}>갯수</Col>
              </Row>
              <hr />
            </Col>
          </Row>
          <div className="holdersubmit--vclist">
            {selected.length >= 1 ? (
              selected.map((e, idx) => {
                return (
                  <Row className="holdersubmit--vc">
                    <Col span={1}>{idx + 1}</Col>
                    <Col span={6}>{new Date().toLocaleString()}</Col>
                    <Col span={2}>
                      <SafetyOutlined />
                    </Col>
                    <Col span={9}>
                      [활동증명서] 코드스테이츠 BEB 05기 수료증
                    </Col>
                    <Col span={6}>코드스테이츠</Col>
                  </Row>
                );
              })
            ) : (
              <>
                <div style={{ fontSize: "1.5rem" }}>
                  선택된 인증서가 없습니다.
                </div>
                <Link to="/holdermanage">
                  <div style={{ fontSize: "1.5rem" }}>
                    📝 인증서 고르러 가기
                  </div>
                </Link>
              </>
            )}
            <hr />
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
              <Col span={12}>
                <input
                  type="text"
                  placeholder="코드스테이츠"
                  className="holderissue--input"
                />
              </Col>
            </Row>
            <Row>
              <Col span={4} offset></Col>
            </Row>
            <hr />
            <Row className="holderissue--regist--container">
              <Col span={2} offset={10}>
                <button className="holderissue--regist">등록 완료</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolderSubmit;
