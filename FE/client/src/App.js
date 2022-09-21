import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "antd";
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

// holder
import HolderManage from "./page/holder/holderManage";
import HolderIssue from "./page/holder/holderIssue";
import HolderSubmit from "./page/holder/holderSubmit";
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
          {type !== "holder" && type !== "" ? <Sider>sider</Sider> : ""}
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
                <Route path="submit" element={<HolderSubmit />} />
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
