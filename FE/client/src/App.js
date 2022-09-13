import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.min.css";
import axios from "axios";

// import componets & pages
import Home from "./page/home";
import Nav from "./component/nav";
import SignIn from "./page/signIn";
import SignUp from "./page/signUp";
import FooterBar from "./component/footerBar";
import HolderManage from "./page/holderManage";
import HolderIssue from "./page/holderIssue";
import HolderSubmit from "./page/holderSubmit";
import IssuerManage from "./page/issuerManage";
import IssuerIssue from "./page/issuerIssue";
import Issuers from "./page/Issuers";
import IssuerListModal from "./component/IssuerListModal";
import IssuerUserList from "./page/issuerUserList";
import Mypage from "./page/mypage";

const { Header, Content, Footer, Sider } = Layout;
function App() {
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  const getUser = async () => {
    const userObj = await axios({
      url: `http://localhost:9999/api/v1/auth/accesstoken`,
      method: "GET",
      withCredentials: true,
    });
    return userObj;
  };
  useEffect(() => {
    try {
      getUser().then((data) => {
        setType(data.data.type);
        setUser(data.data.user);
      });
    } catch (error) {}
  }, []);
  useEffect(() => {});
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header style={{ background: "white" }}>
            <Nav type={type} setType={setType} user={user} setUser={setUser} />
          </Header>
          <Layout>
            {type !== "holder" && type !== "" ? <Sider>sider</Sider> : ""}
            <Content>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  path="/signin"
                  element={
                    <SignIn setUser={setUser} setType={setType} type={type} />
                  }
                />
                <Route path="/signup" element={<SignUp user={user} />} />
                <Route
                  path="/holdermanage"
                  element={<HolderManage user={user} />}
                />
                <Route
                  path="/holderissue"
                  element={<HolderIssue user={user} />}
                />
                <Route
                  path="/holdersubmit"
                  element={<HolderSubmit user={user} />}
                />
                <Route
                  path="/issuermanage"
                  element={<IssuerManage user={user} />}
                />
                <Route path="/holder">
                  <Route path="issuerlist" element={<Issuers user={user} />} />
                  <Route
                    path="modal"
                    element={<IssuerListModal user={user} />}
                  />
                </Route>
                <Route
                  path="/issuerissue"
                  element={<IssuerIssue user={user} />}
                />
                <Route
                  path="/issueruserlist"
                  element={<IssuerUserList user={user} />}
                />

                <Route
                  path="/mypage"
                  element={<Mypage type={type} user={user} />}
                />
              </Routes>
              <div style={{ height: "50px", background: "white" }}></div>
            </Content>
          </Layout>
          <Footer>
            <FooterBar />
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
