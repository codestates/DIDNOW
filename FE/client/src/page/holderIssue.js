// 인증서 등록이 필요한지
import { Button, Row, Col, Breadcrumb, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style/holderIssue.css";
import axios from "axios";

const fileList = [];
const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  defaultFileList: [...fileList],
};
const HolderIssue = () => {
  

  return (
    <div className="holderissue">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/">내 지갑</Breadcrumb.Item>
        <Breadcrumb.Item href="/holdermanage">인증서 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div className="holderissue--form">
        <Row className="holderissue--row">
          <Col span={20} offset={2}>
            <div className="holderissue--title">인증서 발급기관 정보 등록</div>
            <hr />

            <Row className="holderissue--row">
              <Col span={6}>
                <span className="holderissue--sub--title">발급 인증서 명</span>
              </Col>
              <Col span={16}>
                <input
                  className="holderissue--input"
                  type="text"
                  placeholder="e.g) BEB-05기-수료내역서"
                />
              </Col>
              <Col span={2}></Col>
            </Row>
            <Row className="holderissue--row">
              <Col span={6}>
                <div>
                  <span className="holderissue--sub--title">발급 기관 명</span>
                </div>
              </Col>
              <Col span={16}>
                <input
                  className="holderissue--input"
                  type="text"
                  placeholder="e.g) 코드스테이츠"
                />
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="holderissue--row">
              <Col span={6}>
                <div>
                  <span className="holderissue--sub--title">발급일자</span>
                </div>
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>발급일</Col>
                      <Col span={12}>
                        <input type="date" />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={12}>발급일</Col>
                      <Col span={12}>달력</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="holderissue--row">
              <Col span={6}>
                <div>
                  <span className="holderissue--sub--title">자격일련번호</span>
                </div>
              </Col>
              <Col span={16}>
                <input
                  type="text"
                  placeholder="e.g) vbjm2022512"
                  className="holderissue--input"
                />
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="holderissue--row">
              <Col span={6}>
                <div>
                  <span className="holderissue--sub--title">인증서 종류</span>
                </div>
              </Col>
              <Col span={16}>
                <Radio.Group defaultValue="a" size="large">
                  <Radio.Button value="a">활동증명서</Radio.Button>
                  <Radio.Button value="b">상훈관련</Radio.Button>
                  <Radio.Button value="c">인증서</Radio.Button>
                  <Radio.Button value="d">자격증명</Radio.Button>
                  <Radio.Button value="e">어학</Radio.Button>
                  <Radio.Button value="f">기타</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="holderissue--row">
              <Col span={6}>
                <div>
                  <span className="holderissue--sub--title">첨부파일</span>
                </div>
              </Col>
              <Col span={16}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> 파일 업로드
                  </Button>
                </Upload>
              </Col>
              <Col span={2}></Col>
            </Row>
            <hr />
            <Row className="holderissue--regist--container">
              <Col span={2} offset={11}>
                <button className="holderissue--regist">
                  등록 완료
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HolderIssue;
