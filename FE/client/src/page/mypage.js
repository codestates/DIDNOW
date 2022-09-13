import { Breadcrumb, Row, Col } from "antd";
import "./style/mypage.css";

const Mypage = ({ user, type }) => {
  console.log(user);
  return (
    <div className="mypage">
      <Breadcrumb className="mypage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/mypage">정보 수정</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mypage--description">{type}의 정보를 수정합니다.</div>

      <div className="mypage--form">
        <Row className="mypage--row">
          <Col span={20} offset={2}>
            <div className="mypage--title">
              [ {type === "holder" ? user.username : user.title || ""} ] 정보
              수정
            </div>
            <hr />
            {type === "" ? (
              ""
            ) : type === "holder" ? (
              <div>
                <Row>Username</Row>
                <Row>
                  <input type="text" className="mypage--input"></input>
                </Row>
                <Row>E-mail</Row>
                <Row>
                  <input type="text" className="mypage--input"></input>
                </Row>
                <Row>Wallet Address</Row>
                <Row>
                  <input type="text" className="mypage--input"></input>
                </Row>
                <Row>생년월일</Row>
                <Row>
                  <input type="text" className="mypage--input"></input>
                </Row>
              </div>
            ) : (
              <Row>
                <Col span={12} offset={6}>
                  <Row>
                    <span>Title</span>
                  </Row>
                  <Row>
                    <input type="text" className="mypage--input"></input>
                  </Row>
                  <Row>E-mail</Row>
                  <Row>
                    <input type="text" className="mypage--input"></input>
                  </Row>
                  {type === "issuer" ? (
                    <>
                      <Row>Description</Row>
                      <Row>
                        <input type="text" className="mypage--input"></input>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                  <Row>Required Vc</Row>
                  <Row>
                    <input type="text" className="mypage--input"></input>
                  </Row>
                  <Row>
                    <button>수정 완료</button>
                  </Row>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Mypage;
