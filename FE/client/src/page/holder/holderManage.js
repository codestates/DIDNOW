import { Breadcrumb, Row, Col } from "antd";
import "./style/holderManage.css";
import Vc from "../../component/vc";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HolderManage = () => {
  const [vcList, setVcList] = useState([{}]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [issuers, setIssuers] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:9999/api/v1/credential/get-holder-vc-list/",
      method: "GET",
      withCredentials: true,
    }).then((vcListOfHolder) => {
      setVcList(vcListOfHolder.data.reverse());
      axios({
        url: "http://localhost:9999/api/v1/user/issuers",
        method: "GET",
        withCredentials: true,
      }).then((data) => {
        setIssuers(data.data);
      });
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {});

  const selectedHandle = (e) => {
    if (selected.indexOf(e.currentTarget.id) >= 0) {
      // 만약 있으면 뺀다.
      e.currentTarget.classList.remove("vc--selected");
      setSelected(selected.filter((el) => el !== e.currentTarget.id));
    } else {
      e.currentTarget.classList.add("vc--selected");
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
      {isLoading === false ? (
        <>
          <div className="holdermanage--description">
            <div>여러분의 증명, 인증서를 확인 및 다운로드 할 수 있습니다.</div>
            <div>
              기관에서 등록한 인증서는
              <span style={{ color: "red", fontWeight: "700" }}>빨간색</span>
              으로 표시됩니다.
            </div>
          </div>
          <Row className="holdermanage--total">
            <Col span={6}>
              <div className="holdermanage--total--label">{`블록체인에 등록된 인증서 ${vcList.length} 개`}</div>
            </Col>
            <Col span={6}>
              {selected.length >= 1 ? (
                <Link
                  to="/holder/submit"
                  state={{
                    selected: vcList.filter((e, idx) => idx in selected),
                  }}
                >
                  <div className="holdermanage--submit--label">
                    선택된 {selected.length}개의 인증서 제출하기
                  </div>
                </Link>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <div className="holdermanage--vc">
            <Row gutter={48}>
              {vcList.length > 0 ? (
                vcList.map((e, i) => {
                  return (
                    <Col key={i} span={6} style={{ margin: "0 0 30px 0" }}>
                      <Vc
                        data={e}
                        selected={selected}
                        selectedHandle={selectedHandle}
                        idx={i}
                        issuers={issuers}
                      />
                    </Col>
                  );
                })
              ) : (
                <>
                  <div style={{ fontSize: "1.5rem" }}>
                    등록된 인증서가 없습니다.
                  </div>
                  <div style={{ fontSize: "1.5rem" }}>
                    <Link to="/holder/issuerlist">📝 인증서 등록하러 가기</Link>
                  </div>
                </>
              )}
            </Row>
          </div>
          {/* pagination 은 따로 구현해야 할듯 쓸만한거 없음 */}
        </>
      ) : (
        "loading"
      )}
      ;
    </div>
  );
};

export default HolderManage;
