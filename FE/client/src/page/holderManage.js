import { Breadcrumb, Row, Col } from "antd";
import "./style/holderManage.css";
import Vc from "../component/vc";
import dummyData from "../assets/dummyVc";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HolderManage = () => {
  const [vcList, setVcList] = useState([]);
  const [selected, setSelected] = useState([]);
  let registByMeCount = 0;
  let registByOrgCount = 0;
  vcList.filter((e) =>
    e.status === 0 ? registByMeCount++ : registByOrgCount++
  );
  useEffect(() => {
    setVcList([...dummyData]);
  }, []);

  useEffect(() => {});
  const selectedHandle = (e) => {
    if (selected.indexOf(e.currentTarget.id) >= 0) {
      setSelected(selected.filter((el) => el !== e.currentTarget.id));
    } else {
      setSelected([e.currentTarget.id, ...selected]);
    }
  };
  return (
    <div className="holdermanage">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">인증서 관리</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holdermanage--description">
        <div>여러분의 증명, 인증서를 확인 및 다운로드 할 수 있습니다.</div>
        <div>
          내가 등록한 인증서는
          <span style={{ color: "blue", fontWeight: "700" }}>파란색</span>,
          기관에서 등록한 인증서는
          <span style={{ color: "red", fontWeight: "700" }}>빨간색</span>
          으로 표시됩니다.
        </div>
      </div>
      <Row className="holdermanage--total">
        <Col span={3}>
          <div className="holdermanage--total--label">
            {`총 ${vcList.length}개`}
          </div>
        </Col>
        <Col span={4}>
          <div className="holdermanage--total--label">{`내가 등록한 인증서 ${registByMeCount} 개`}</div>
        </Col>
        <Col span={5}>
          <div className="holdermanage--total--label">{`블록체인에 등록된 인증서 ${registByOrgCount} 개`}</div>
        </Col>
        <Col span={6}>
          <Link to="/holdersubmit" state={{ selected: selected }}>
            <div className="holdermanage--submit--label">
              선택된 {selected.length}개의 인증서 제출하기
            </div>
          </Link>
        </Col>
      </Row>
      <div className="holdermanage--vc">
        <Row gutter={48}>
          {vcList.map((e, i) => {
            return (
              <Col key={i} span={6} style={{ margin: "0 0 30px 0" }}>
                <Vc
                  data={e}
                  selected={selected}
                  selectedHandle={selectedHandle}
                  idx={e.id}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      {/* pagination 은 따로 구현해야 할듯 쓸만한거 없음 */}
    </div>
  );
};

export default HolderManage;
