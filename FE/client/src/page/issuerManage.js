import { Breadcrumb, Row, Col, Checkbox } from "antd";
import "./style/issuermanage.css";
const IssuerManage = () => {
  const currentUser = {
    id: 1,
    name: "코드스테이츠",
    type: "issuer",
  };

  const vcList = [
    {
      id: 1,
      category: "졸업증명서",
      name: "BEB01기 졸업증명서",
      amount: 10,
    },
    {
      id: 2,
      category: "졸업증명서",
      name: "BEB02기 졸업증명서",
      amount: 20,
    },
    {
      id: 3,
      category: "졸업증명서",
      name: "BEB03기 졸업증명서",
      amount: 30,
    },
    {
      id: 4,
      category: "졸업증명서",
      name: "BEB04기 졸업증명서",
      amount: 40,
    },
    {
      id: 5,
      category: "졸업증명서",
      name: "BEB05기 졸업증명서",
      amount: 50,
    },
  ];

  return (
    <div className="issuermanage">
      <Breadcrumb className="issuermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issuermanage">인증서 관리</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issuermanage--description">{`'${currentUser.name}' 기업이 발급한 인증서를 확인 할 수 있습니다.`}</div>
      <Row style={{ margin: "0 0 0 5%" }}>
        <Col span={3}>
          <div className="issuermanage--total--label">총 12건</div>
        </Col>
      </Row>
      <Row className="issuermanage--list--column">
        <Col span={2}>선택</Col>
        <Col span={2}>번호</Col>
        <Col span={4}>발급일자</Col>
        <Col span={8}>발급/조회 인증서</Col>
        <Col span={6}>발급/조회 기관</Col>
        <Col span={2}>발급인원</Col>
      </Row>
      {vcList.map((e, idx) => {
        return (
          <Row key={idx} className="issuermanage--list--column">
            <Col span={2}>
              <Checkbox />
            </Col>
            <Col span={2}>{idx + 1}</Col>
            <Col span={4}>{new Date().toLocaleString()}</Col>
            <Col span={8}>{`[${e.category}] ${e.name}`}</Col>
            <Col span={6}>{currentUser.name}</Col>
            <Col span={2}>{e.amount}</Col>
          </Row>
        );
      })}
    </div>
  );
};

export default IssuerManage;
