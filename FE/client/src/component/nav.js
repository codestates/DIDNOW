import logo from "../img/didnow.png";
import { Link } from "react-router-dom";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style/nav.css";
import { useEffect } from "react";

/* 
  현재 에러가 있다고 나옵니다.
  menu.item 컴포넌트가 다음 업데이트에 사라진다는 내용,
  items 배열로 렌더링 하도록 리팩토링 하겠습니다.
*/

const Nav = ({ type, setType, user, setUser }) => {
  useEffect(() => {});

  const handleClick = () => {
    window.location.href = '/signin'
  }

  return (
    <Row>
      <Col span={6}>
        <Link to="/home">
          <img src={logo} alt="" style={{ height: "64px" }} />
        </Link>
      </Col>
      <Col onClick={handleClick} span={5} offset={12} style={{ textAlign: "right", cursor : "pointer", fontWeight:700}}>
        <span className="ant-dropdown-link">
          <Avatar>
            <UserOutlined />
          </Avatar>
          <span style={{ margin: "0 0 0 5px" }}>
            {type === ""
              ? "Guest"
              : type === "holder"
              ? user.username
              : user.title}
          </span>
        </span>
      </Col>
    </Row>
  );
};

export default Nav;
