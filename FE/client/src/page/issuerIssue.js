import { Breadcrumb, Row, Col, Radio } from "antd";
import { useState, useEffect } from "react";
import "./style/issuerissue.css";

const CompanyIssue = () => {
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: "",
      birthdate: "",
      code: "",
      file: "",
    },
  ]);

  const addUser = () => {
    setUserList([
      ...userList,
      {
        id: userList[userList.length - 1].id + 1,
        name: "",
        birthdate: "",
        code: "",
        file: "",
      },
    ]);
  };

  const removeUser = (e) => {
    const id = e.target.id;
    const arr = userList.filter((el) => {
      console.log(el.id);
      console.log(id);
      return el.id !== id;
    });
    console.log(arr);
    setUserList([...arr]);
  };

  useEffect(() => {});
  return (
    <div className="issuerissue">
      <Breadcrumb className="issuerissue--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issuerissue">인증서 발급</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issuerissue--description">{`인증서 발급 대상자에게 인증서를 발급할 수 있습니다.`}</div>
      <div className="issuerissue--description">{`※ 인증서 발급 완료 시 발급 대상자에게 자동알림이 가며, 커리어 회원이 아닌 경우 발송이 원활하지 않을 수 있습니다.`}</div>
      <div className="issuerissue--form">
        <Row className="issuerissue--row">
          <Col span={20} offset={2}>
            <div className="issuerissue--title">인증서 발급기관 정보 입력</div>
            <hr />

            <Row className="issuerissue--row">
              <Col span={6}>
                <span className="issuerissue--sub--title">발급 인증서 명</span>
              </Col>
              <Col span={16}>
                <input
                  className="issuerissue--input"
                  type="text"
                  placeholder="e.g) BEB-05기-수료내역서"
                />
              </Col>
              <Col span={2}></Col>
            </Row>
            <Row className="issuerissue--row">
              <Col span={6}>
                <div>
                  <span className="issuerissue--sub--title">발급 기관 명</span>
                </div>
              </Col>
              <Col span={16}>
                <span>{"코드스테이츠"}</span>
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="issuerissue--row">
              <Col span={6}>
                <div>
                  <span className="issuerissue--sub--title">유효기간</span>
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

            <Row className="issuerissue--row">
              <Col span={6}>
                <div>
                  <span className="issuerissue--sub--title">인증서 종류</span>
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
            <hr />
          </Col>
        </Row>
        <Row className="issuerissue--row">
          <Col span={20} offset={2}>
            <div className="issuerissue--title">인증서 수혜자 정보 입력</div>
            <hr />
            <Row>
              <Col span={3}>이름</Col>
              <Col span={3}>생년월일</Col>
              <Col span={3}>인증서 종류</Col>
              <Col span={3}>인증일자</Col>
              <Col span={3}>기관?</Col>
              <Col span={3}>주소</Col>
              <Col span={3}>성인여부</Col>
              <Col span={3}>
                <button onClick={addUser}>+</button>
              </Col>
            </Row>
            {userList.map((e, idx) => {
              return (
                <Row key={idx}>
                  <Col span={3}>
                    <input type="text" />
                  </Col>
                  <Col span={4}>
                    <input type="text" />
                  </Col>
                  <Col span={6}>
                    <input type="text" />
                  </Col>
                  <Col span={8}>
                    {e.file}
                    <button>파일추가</button>
                  </Col>
                  <Col span={3}>
                    <button id={e.id} onClick={removeUser}>
                      -
                    </button>
                  </Col>
                </Row>
              );
            })}
            <hr />
            <Row className="issuerissue--regist--container">
              <Col span={2} offset={11}>
                <button className="issuerissue--regist">등록 완료</button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompanyIssue;
