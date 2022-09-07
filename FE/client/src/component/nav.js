import logo from "../img/didnow.png";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown, Avatar } from "antd";
import {
  UnlockOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item>내 정보 수정</Menu.Item>
    <SubMenu title="내 지갑">
      <Menu.Item>
        <Link to="/usermanage">인증서 관리</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/userissue">인증서 등록</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/usersubmit">인증서 제출</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item>로그아웃</Menu.Item>
  </Menu>
);
const Nav = () => {
  return (
    <Row>
      <Col span={6}>
        <Link to="/">
          <img src={logo} alt="" style={{ height: "64px" }} />
        </Link>
      </Col>
      <Col span={3} offset={15}>
        <Link to="/signin">
          <UnlockOutlined style={{ fontSize: "16px" }} />
          로그인
        </Link>
        <Link to="/signup">
          <UserAddOutlined style={{ fontSize: "16px" }} />
          회원가입
        </Link>
        <Dropdown overlay={menu}>
          <span className="ant-dropdown-link">
            <Avatar>
              <UserOutlined />
            </Avatar>
            홍길동님
          </span>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Nav;
