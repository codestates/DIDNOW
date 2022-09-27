import {
  AuditOutlined,
  FileDoneOutlined,
  FolderOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SideMenu = ({ type, logout }) => {
  const commonItems = [
    type !== ""
      ? {
          label: (
            <Link className="sider--link" to="/mypage">
              <SettingOutlined />
              {`\u00A0 정보수정`}
            </Link>
          ),
          key: "mypage",
        }
      : "",
    type !== ""
      ? {
          label: (
            <div className="sider--link" onClick={logout}>
              <LogoutOutlined />
              {`\u00A0 로그아웃`}
            </div>
          ),
          key: "logout",
        }
      : {
          label: (
            <Link to={"/signin"} className="sider--link">
              <LoginOutlined />
              {`\u00A0 로그인`}
            </Link>
          ),
          key: "signin",
        },
    type === ""
      ? {
          label: (
            <Link to={"/signup"} className="sider--link">
              <UserAddOutlined />
              {`\u00A0 회원가입`}
            </Link>
          ),
          key: "signup",
        }
      : "",
  ];

  const homeItem = [
    {
      label: (
        <Link to="/home" className="sider--link">
          <HomeOutlined />
          {`\u00A0 메인화면`}
        </Link>
      ),
      key: "home",
    },
  ];
  const holderItems = [
    {
      label: (
        <Link to="/holder/issuerlist" className="sider--link">
          <FileDoneOutlined />
          {`\u00A0 인증서 발급`}
        </Link>
      ),
      key: "issuerlist",
    },
    {
      label: (
        <Link to="/holder/manage" className="sider--link">
          <FolderOutlined />
          {`\u00A0 인증서 관리`}
        </Link>
      ),
      key: "holdermanage",
    },
  ];
  const issuerItems = [
    {
      label: (
        <Link to="/issuer/issue" className="sider--link">
          <HomeOutlined />
          {`\u00A0 발급할 인증서 등록`}
        </Link>
      ),
      key: "issuerissue",
    },
    {
      label: (
        <Link to="/issuer/userlist" className="sider--link">
          <HomeOutlined />
          {`\u00A0 발급 가능한 인원 관리`}
        </Link>
      ),
      key: "issueruserlist",
    },
  ];
  const verifierItems = [
    {
      label: (
        <Link to="/verifier/vplist" className="sider--link">
          <AuditOutlined />
          {`\u00A0 제출된 인증서 검증`}
        </Link>
      ),
      key: "verifiervplist",
    },
  ];

  const items =
    type === ""
      ? [...homeItem, ...commonItems]
      : type === "holder"
      ? [...homeItem, ...holderItems, ...commonItems]
      : type === "issuer"
      ? [...homeItem, ...issuerItems, ...commonItems]
      : type === "verifier"
      ? [...homeItem, ...verifierItems, ...commonItems]
      : "";
  return (
    <Menu style={{ height: "100%", padding: "20% 0 0 0" }} items={items} />
  );
};

export default SideMenu;
