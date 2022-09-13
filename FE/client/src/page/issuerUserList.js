import { Breadcrumb, Row, Col, Menu, Dropdown, Checkbox } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style/issueruserlist.css";

const IssuerUserList = ({ user }) => {
  useEffect(() => {});
  useEffect(() => {
    if (user !== {}) {
      axios({
        url: `http://localhost:9999/api/v1/user/issuer-user/${user._id}`,
        method: "GET",
        withCredentials: true,
      }).then((data) => {
        console.log(data);
      });
    }
  }, []);
  const [vc, setVc] = useState({
    credentialTitle: "",
    credentialName: "",
    credentialType: "",
  });
  const fullColumns = [
    { title: "이름", size: 3, value: "username" },
    { title: "E-mail", size: 5, value: "email" },
    { title: "생년월일", size: 4, value: "birthDay" },
    { title: "인증서 종류", size: 4, value: "vcTitle" },
    { title: "인증일자", size: 4, value: "vcDate" },
    { title: "국적", size: 2, value: "Nationality" },
    { title: "성인여부", size: 2, value: "isAdult" },
  ];

  const [currentColumns, setCurrentColumns] = useState(fullColumns);
  const onchange = (e) => {
    setVc({
      [e.target.id]: e.target.value,
    });
  };
  const changeColumns = (e) => {
    console.log(e.target);
  };

  const columns = (
    <Menu>
      {/* <Menu.Item key={1}>생년월일</Menu.Item>
      <Menu.Item key={2}>인증서 종류</Menu.Item>
      <Menu.Item key={3}>인증일자</Menu.Item>
      <Menu.Item key={4}>국적</Menu.Item>
      <Menu.Item key={5}>성인여부</Menu.Item> */}

      {currentColumns.map((e, idx) => {
        return (
          <Menu.Item key={idx} id={e.value}>
            {idx === 0 || idx === 1 ? (
              <Checkbox checked="true" disabled>
                {e.title}
              </Checkbox>
            ) : (
              <Checkbox
                onClick={(e) => {
                  changeColumns(e);
                }}
              >
                {e.title}
              </Checkbox>
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const submitVc = () => {
    axios({
      url: "",
      method: "POST",
      data: vc,
      withCredentials: true,
    });
  };
  return (
    <div className="issueruserlist">
      <Breadcrumb className="issueruserlist--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issueruserlist">인증서 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issueruserlist--description">{`issuer가 관리중인 userList를 관리합니다.`}</div>
      <div className="issueruserlist--form">
        <Row className="issueruserlist--row">
          <Col span={20} offset={2}>
            <div className="issueruserlist--title">
              [ {user.title} ] Issuer User List 등록{" "}
            </div>
            <hr />
            <Row>
              {currentColumns.map((e, idx) => {
                return (
                  <Col span={e.size} key={idx}>
                    {e.title}
                    {idx === currentColumns.length - 1 ? (
                      <Dropdown overlay={columns} trigger={["click"]}>
                        <button className="issueruserlist--columns--btn">
                          +
                        </button>
                      </Dropdown>
                    ) : (
                      ""
                    )}
                  </Col>
                );
              })}
            </Row>
            <Row>
              {currentColumns.map((e, idx) => {
                return (
                  <Col span={e.size} key={idx}>
                    <input
                      type="text"
                      className="issueruserlist--columns-input"
                    ></input>
                  </Col>
                );
              })}
            </Row>
            <Row style={{ margin: "50px 0 ", justifyContent: "center" }}>
              <button onClick={submitVc}>등록하기</button>
            </Row>
            <Row>
              {fullColumns.map((e, idx) => {
                return <Col span={e.size}>{e.title}</Col>;
              })}
            </Row>
            <hr />
            {/* userlist 목록을 불러와야한다. */}
            <hr />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IssuerUserList;
