import {
  Breadcrumb,
  Row,
  Col,
  Checkbox,
  DatePicker,
  message,
  Select,
  Spin,
  Pagination,
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
  // 선택한 홀더
  const [holder, setHolder] = useState({});
  // 로딩화면
  const [isLoading, setIsLoading] = useState(true);
  // 페이징
  const [page, setPage] = useState(1);

  useEffect(() => {
    // User 정보를 받아온다.
    axios({
      url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
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
          url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer-user/all/${data.data.user._id}`,
          method: "GET",
          withCredentials: true,
        }).then((userListData) => {
          // UserList 를 저장하는데, UserList 중
          // 현재 로그인한 issuer 가 등록한 UserList 만 상태에 저장한다.
          const arr = userListData.data.filter((e) => {
            return e.organizationId === data.data.user._id;
          });
          setUserList([...arr]);
          setIsLoading(false);
        });
        axios({
          url: `${process.env.REACT_APP_HOLDER}/hol/api/v1/holder/find/all`,
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

  // input을 관리하기 위한 상태
  const [userListObj, setUserListObj] = useState({
    organizationId: "",
    cr_name: "",
    cr_email: "",
    cr_birthDate: "",
    cr_certificateType: "",
    cr_certificateName: "",
    cr_certificateDate: "",
    cr_Nationality: "대한민국",
    cr_address: "",
    cr_isAdult: false,
    holderId: "",
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
    if (userListObj.cr_email === "") {
      message.error("사용자를 선택해주세요.");
    } else if (userListObj.cr_certificateName === "") {
      message.error("인증서 이름을 입력해주세요.");
    } else if (userListObj.cr_certificateType === "") {
      message.error("인증서 타입을 입력해주세요.");
    } else if (userListObj.cr_certificateDate === "") {
      message.error("인증일자를 선택해주세요.");
    } else if (userListObj.cr_Nationality === "") {
      message.error("국적을 선택해주세요.");
    } else {
      userListObj.organizationId = user._id;
      setUserListObj(userListObj);
      setIsLoading(true);

      axios({
        url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer-user/${user._id}`,
        method: "POST",
        data: { ...userListObj, organizationId: user._id, holderId: holderId },
        withCredentials: true,
      })
        .catch((error) => {
          message.error("유저 목록을 작성하던중 오류가 발생했습니다.");
          setIsLoading(false);
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
            holderId: "",
          });
          setHolderId("");
          setIsLoading(false);
          message.success("유저 목록이 작성되었습니다.");
        });
    }
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

  // 국적 변경
  const countries = [
    { flag: "🇰🇷", value: "대한민국" },
    { flag: "🇯🇵", value: "일본" },
    { flag: "🇺🇸", value: "미국" },
    { flag: "🇨🇳", value: "중국" },
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
    setHolder(holderList[i]);
    // 나이계산
    const year =
      new Date().getFullYear() - new Date(holderList[i].birthDay).getFullYear();
    const month =
      new Date().getMonth() - new Date(holderList[i].birthDay).getMonth();
    setUserListObj({
      organizationId: "",
      cr_email: e,
      cr_name: holderList[i].username,
      cr_birthDate: holderList[i].birthDay.slice(0, 10),
      cr_certificateType: "",
      cr_certificateName: "",
      cr_certificateDate: "",
      cr_Nationality: "대한민국",
      cr_address: "",
      cr_isAdult: (month < 0 ? year - 1 : year) > 18 ? true : false,
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
        <Spin tip="로딩중..." size="large" spinning={isLoading}>
          <Row>
            <Col span={20} offset={2}>
              <div className="issueruserlist--title">
                [ {user.title} ] Issuer User List 등록
              </div>
              <hr />

              <Row className="`issueruserlist`--row--title">
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    margin: "5% 0 0 0",
                  }}
                >
                  사용자 선택
                </span>
              </Row>
              <Row className="issueruserlist--row">
                <Col span={2}>이메일</Col>
                <Col span={8}>
                  <Select
                    style={{ width: "90%" }}
                    onChange={changeHolder}
                    placeholder="사용자를 선택해주세요."
                  >
                    {holderList.map((e, idx) => {
                      return <Option key={e.email}>{e.email}</Option>;
                    })}
                  </Select>
                </Col>
              </Row>
              <Row className="issueruserlist--row--title">
                <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  사용자 정보
                </span>
              </Row>
              <Row className="issueruserlist--row">
                <Col span={2} style={{ fontWeight: "700" }}>
                  이름
                </Col>
                <Col span={4}>{userListObj.cr_name}</Col>
                <Col span={2} style={{ fontWeight: "700" }}>
                  생년월일
                </Col>
                <Col span={4}>
                  {Object.keys(holder).length !== 0
                    ? holder.birthDay.slice(0, 10)
                    : ""}
                </Col>
                <Col span={3} style={{ fontWeight: "700" }}>
                  성인여부
                </Col>
                <Col span={1}>
                  {userListObj.cr_isAdult ? (
                    <Checkbox checked disabled />
                  ) : (
                    <Checkbox disabled />
                  )}
                </Col>
              </Row>
              <Row className="issueruserlist--row--title">
                <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  입력사항
                </span>
              </Row>
              <Row>
                <Col span={3} style={{ fontWeight: "700" }}>
                  인증서 이름
                </Col>
                <Col span={9}>
                  <input
                    className="issueruserlist--columns-input"
                    type="text"
                    id="cr_certificateName"
                    onChange={onchange}
                    value={userListObj.cr_certificateName}
                    placeholder="블록체인 개발자"
                  />
                </Col>
                <Col span={3} style={{ fontWeight: "700" }}>
                  인증서 타입
                </Col>
                <Col span={9}>
                  <input
                    className="issueruserlist--columns-input"
                    type="text"
                    id="cr_certificateType"
                    onChange={onchange}
                    value={userListObj.cr_certificateType}
                    placeholder="5기"
                  />
                </Col>
              </Row>
              <Row className="issueruserlist--row">
                <Col span={3} style={{ fontWeight: "700" }}>
                  인증 일자
                </Col>
                <Col span={9}>
                  <DatePicker
                    onChange={certDateChange}
                    style={{ width: "90%" }}
                    placeholder="날짜를 선택해주세요."
                  />
                </Col>
                <Col span={3} style={{ fontWeight: "700" }}>
                  국적
                </Col>
                <Col span={9}>
                  <Select
                    style={{
                      width: "90%",
                    }}
                    value={userListObj.cr_Nationality}
                    onChange={nationalityChange}
                    placeholder="국적을 선택해주세요."
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

              <Row style={{ margin: "50px 0 ", justifyContent: "center" }}>
                <button
                  className="issueruserlist--submit"
                  onClick={submitUserList}
                >
                  등록하기
                </button>
              </Row>
              <Row>
                <div className="issueruserlist--subtitle">
                  인증된 사용자 목록
                </div>
              </Row>
              <hr />
              <Row style={{ margin: "20px 0px", fontWeight: 700 }}>
                <Col span={1}>번호</Col>
                <Col span={3}>이름</Col>
                <Col span={5}>이메일</Col>
                <Col span={4}>인증서 이름</Col>
                <Col span={4}>인증서 타입</Col>
                <Col span={4}>인증 일자</Col>
                <Col span={2}>성인</Col>
              </Row>
              {userList
                .filter((e, idx) => {
                  return idx < page * 10 && idx >= (page - 1) * 10;
                })
                .map((el, idx) => {
                  return (
                    <Row key={idx}>
                      <Col span={1} style={{ padding: "0 0 0 1%" }}>
                        {idx + 1}
                      </Col>
                      <Col span={3}>{el.cr_name || "null"}</Col>
                      <Col span={5}>{el.cr_email || "null"}</Col>
                      <Col span={4}>{el.cr_certificateName || "null"}</Col>
                      <Col span={4}>{el.cr_certificateType || "null"}</Col>
                      <Col span={4}>
                        {el.cr_certificateDate.slice(2, 10) || "null"}
                      </Col>
                      <Col span={2}>{el.cr_isAdult === true ? "O" : "X"}</Col>
                    </Row>
                  );
                })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "5% 0 ",
                }}
              >
                <Pagination
                  defaultCurrent={page}
                  total={userList.length}
                  onChange={(e) => setPage(e)}
                />
              </div>
              <hr />
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};

export default IssuerUserList;
