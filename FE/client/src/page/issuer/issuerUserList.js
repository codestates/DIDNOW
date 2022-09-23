import {
  Breadcrumb,
  Row,
  Col,
  Checkbox,
  DatePicker,
  message,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/issueruserlist.css";
const { Option } = Select;

const IssuerUserList = () => {
  const navigate = useNavigate();
  // 서버에서 UserList 를 받아오기 위한 User 정보를 담을 상태변수 선언
  const [user, setUser] = useState({});
  // 서버에 요청하여 받은 UserList 를 담아을 상태 선언
  const [userList, setUserList] = useState([]);
  // 로그인한 issuer를 issuerList 로 등록한 holderList
  const [holderList, setHolderList] = useState([]);
  // 선택한 홀더의 id
  const [holderId, setHolderId] = useState("");

  useEffect(() => {
    // User 정보를 받아온다.
    axios({
      url: "/aut/api/v1/accesstoken",
      method: "GET",
      withCredentials: true,
    })
      .catch(() => {
        message.error("로그인 후 이용 가능합니다.");
        navigate("/signin");
        navigate(0);
      })
      .then((data) => {
        // 접근 제한
        if (data.data.type !== "issuer") {
          message.error("issuer만 접근 가능합니다.");
          navigate("/");
        }
        // User 정보를 상태에 저장
        setUser(data.data.user);
        // User 정보를 토대로 UserList를 받아온다.
        axios({
          url: `/iss/api/v1/issuer-user/${data.data.user._id}`,
          method: "GET",
          withCredentials: true,
        }).then((userListData) => {
          // UserList 를 저장하는데, UserList 중
          // 현재 로그인한 issuer 가 등록한 UserList 만 상태에 저장한다.
          const arr = userListData.data.filter((e) => {
            return e.organizationId === data.data.user._id;
          });
          setUserList([...arr]);
        });
        axios({
          url: "/hol/api/v1/holder/find/all",
          method: "GET",
          withCredentials: true,
        }).then((result) => {
          const arr = result.data.filter((e) => {
            return e.IssuerList.indexOf(data.data.user._id) >= 0;
          });
          setHolderList([...arr]);
        });
      });
  }, [navigate]);
  // Re-Render 를 위한 useEffect
  useEffect(() => {
    console.log(userListObj);
  });

  // input을 관리하기 위한 상태
  const [userListObj, setUserListObj] = useState({
    organizationId: "",
    cr_name: "",
    cr_email: "",
    cr_birthDate: "",
    cr_certificateType: "",
    cr_certificateName: "",
    cr_certificateDate: "",
    cr_Nationality: "",
    cr_address: "",
    cr_isAdult: false,
    holderId: "63282f276757db225b9ee418",
  });

  // input 변경시 상태 변경
  const onchange = (e) => {
    setUserListObj((prevUserListObj) => {
      return {
        ...prevUserListObj,
        [e.target.id]: e.target.value,
      };
    });
  };

  // 서버로 작성한 UserList 전송
  const submitUserList = () => {
    userListObj.organizationId = user._id;
    setUserListObj(userListObj);
    console.log({ ...userListObj, organizationId: user._id });
    axios({
      url: `/iss/api/v1/issuer-user/${user._id}`,
      method: "POST",
      data: { ...userListObj, organizationId: user._id, holderId: holderId },
      withCredentials: true,
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        setUserList([...userList, userListObj]);
        // 입력값 초기화
        setUserListObj({
          organizationId: "",
          cr_name: "",
          cr_email: "",
          cr_birthDate: "",
          cr_certificateType: "",
          cr_certificateName: "",
          cr_certificateDate: "",
          cr_Nationality: "",
          cr_address: "",
          cr_isAdult: false,
        });
      });
  };

  // 인증일자 변경
  const certDateChange = (date, dateString) => {
    setUserListObj((prev) => {
      return {
        ...prev,
        cr_certificateDate: dateString,
      };
    });
  };

  // 성인여부 변경
  const isAdultChange = (e) => {
    setUserListObj((prevUserListObj) => {
      return {
        ...prevUserListObj,
        cr_isAdult: e.target.checked,
      };
    });
  };

  // 국적 변경
  const countries = [
    { flag: "🇰🇷", value: "Republic Of South Korea" },
    { flag: "🇯🇵", value: "JAPAN" },
    { flag: "🇺🇸", value: "United States of America" },
    { flag: "🇨🇳", value: "China" },
  ];
  const nationalityChange = (e) => {
    setUserListObj((prevUserListObj) => {
      return {
        ...prevUserListObj,
        cr_Nationality: e,
      };
    });
  };

  const changeHolder = (e) => {
    const i = holderList.findIndex((el) => {
      return el.email === e;
    });
    setUserListObj({
      organizationId: "",
      cr_email: e,
      cr_name: holderList[i].username,
      cr_birthDate: holderList[i].birthDay.slice(0, 10),
      cr_certificateType: "",
      cr_certificateName: "",
      cr_certificateDate: "",
      cr_Nationality: "",
      cr_address: "",
      cr_isAdult: false,
    });
    setHolderId(holderList[i]._id);
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
              [ {user.title} ] Issuer User List 등록
            </div>
            <hr />

            <Row>
              <Col span={5}>이메일</Col>
              <Col span={12}>
                <Select style={{ width: "90%" }} onChange={changeHolder}>
                  {holderList.map((e, idx) => {
                    return <Option key={e.email}>{e.email}</Option>;
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={5}>이름 </Col>
              <Col span={12}>
                <Row>{userListObj.cr_name}</Row>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={5}>인증서 이름</Col>
              <Col span={12}>
                <input
                  className="issueruserlist--columns-input"
                  type="text"
                  id="cr_certificateName"
                  onChange={onchange}
                  value={userListObj.cr_certificateName}
                />
              </Col>
            </Row>

            <Row>
              <Col span={5}>인증서 타입</Col>
              <Col span={12}>
                <input
                  className="issueruserlist--columns-input"
                  type="text"
                  id="cr_certificateType"
                  onChange={onchange}
                  value={userListObj.cr_certificateType}
                />
              </Col>
            </Row>
            <Row>
              <Col span={5}>국적</Col>
              <Col span={12}>
                <Select
                  style={{
                    width: "90%",
                  }}
                  value={userListObj.cr_Nationality}
                  onChange={nationalityChange}
                >
                  {countries.map((e, idx) => {
                    return (
                      <Option
                        key={idx}
                        value={e.value}
                      >{`${e.flag} ${e.value}`}</Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            {/* 
            <Row>
              <Col span={5}>생년월일</Col>
              <Col span={12}>
                <DatePicker
                  onChange={birthDateChange}
                  style={{ width: "90%" }}
                />
              </Col>
            </Row> */}

            <Row>
              <Col span={5}>인증일자</Col>
              <Col span={12}>
                <DatePicker
                  onChange={certDateChange}
                  style={{ width: "90%" }}
                />
              </Col>
            </Row>

            <Row>
              <Col span={5}>성인여부</Col>
              <Col span={12}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    onChange={isAdultChange}
                    checked={userListObj.cr_isAdult}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={3}>이름</Col>
              <Col span={9}>e</Col>
            </Row>

            <Row style={{ margin: "50px 0 ", justifyContent: "center" }}>
              <button
                className="issueruserlist--submit"
                onClick={submitUserList}
              >
                등록하기
              </button>
            </Row>
            <Row>
              <div className="issueruserlist--subtitle">Issuer User List</div>
            </Row>
            <hr />
            {userList.map((el, idx) => {
              return (
                <Row key={idx}>
                  <Col span={1}>{idx + 1}</Col>
                  <Col span={3}>{el.cr_name || "null"}</Col>
                  <Col span={5}>{el.cr_email || "null"}</Col>
                  <Col span={4}>{el.cr_certificateName || "null"}</Col>
                  <Col span={4}>{el.cr_certificateType || "null"}</Col>
                  <Col span={4}>{el.cr_certificateDate || "null"}</Col>
                  <Col span={2}>{el.cr_isAdult === true ? "O" : "X"}</Col>
                </Row>
              );
            })}
            <hr />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IssuerUserList;
