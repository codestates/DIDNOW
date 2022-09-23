import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, message } from "antd";
import "./App.css";
import "antd/dist/antd.min.css";
import axios from "axios";

// import componets & pages
// common
import Home from "./page/common/home";
import Nav from "./component/nav";
import SignIn from "./page/common/signIn";
import SignUp from "./page/common/signUp";
import FooterBar from "./component/footerBar";
import Mypage from "./page/common/mypage";
import SideMenu from "page/common/sideMenu";

// holder
import HolderManage from "./page/holder/holderManage";
import HolderIssue from "./page/holder/holderIssue";
import Issuers from "./page/holder/Issuers";

// issuer
import IssuerManage from "./page/issuer/issuerManage";
import IssuerIssue from "./page/issuer/issuerIssue";
import IssuerListModal from "./component/IssuerListModal";
import IssuerUserList from "./page/issuer/issuerUserList";

// verifier
import VerifierVPList from "./page/verifier/verifierVPList";

// launch page
import Launch from "./page/launch/launch";

// config
const { Header, Content, Footer, Sider } = Layout;

// main
function App() {
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  const location = useLocation();
  const getUser = async () => {
    const userObj = await axios({
      url: `http://localhost:9999/api/v1/auth/accesstoken`,
      method: "GET",
      withCredentials: true,
    }).catch((error) => {});
    return userObj;
  };
  const navigate = useNavigate();
  useEffect(() => {
    try {
      getUser()
        .then((data) => {
          setType(data.data.type);
          setUser(data.data.user);
        })
        .catch(() => {});
    } catch (error) {}
  }, []);
  useEffect(() => {});

  const logout = () => {
    axios({
      url: "http://localhost:9999/api/v1/auth/logout",
      method: "POST",
      withCredentials: true,
    })
      .then((data) => {
        message.info("로그아웃 되었습니다.");
        setType("");
        setUser({});
        navigate("/home");
      })
      .catch(() => {
        message.error("로그아웃 실패");
      });
  };
  return (
    <div className="App">
      {/* common Route */}
      <Layout>
        {location.pathname === "/" ? null : (
          <Header style={{ background: "white" }}>
            <Nav type={type} setType={setType} user={user} setUser={setUser} />
          </Header>
        )}
        <Layout>
          {/* issuer, verifier 화면에서만 사이드메뉴 렌더링 */}
          {location.pathname === "/" ? null : (
            <Sider style={{ background: "inherit" }} width={"15%"}>
              <SideMenu type={type} logout={logout} />
            </Sider>
          )}
          <Content>
            <Routes>
              {/* common Route */}
              <Route path="/">
                <Route path="" element={<Launch />} />
                <Route path="home" element={<Home />} />
                <Route
                  path="signin"
                  element={
                    <SignIn setUser={setUser} setType={setType} type={type} />
                  }
                />
                <Route path="signup" element={<SignUp user={user} />} />
                <Route path="/mypage" element={<Mypage type={type} />} />
                {/* Not Found */}
                <Route path={"*"} element={<div>not found</div>} />
              </Route>

              {/* holder Route */}
              <Route path="/holder">
                <Route path="issue" element={<HolderIssue />} />
                <Route path="manage" element={<HolderManage />} />
                <Route path="issuerlist" element={<Issuers user={user} />} />
                <Route path="modal" element={<IssuerListModal user={user} />} />
                {/* Not Found */}
                <Route path={"*"} element={<div>not found</div>} />
                <Route path="" element={<div>not found</div>} />
              </Route>

              {/* issuer Route */}
              <Route path="issuer">
                <Route path="manage" element={<IssuerManage user={user} />} />
                <Route
                  path="issue"
                  element={<IssuerIssue user={user} type={type} />}
                />
                <Route path="userlist" element={<IssuerUserList />} />
                {/* Not Found */}
                <Route path={"*"} element={<div>not found</div>} />
                <Route path="" element={<div>not found</div>} />
              </Route>

              {/* verifier Route */}
              <Route path="verifier">
                <Route path="vplist" element={<VerifierVPList />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
        {location.pathname === "/" ? null : (
          <Footer>
            <FooterBar />
          </Footer>
        )}
      </Layout>
    </div>
  );
}

export default App;
