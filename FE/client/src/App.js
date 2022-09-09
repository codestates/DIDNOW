import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.min.css";

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

const { Header, Content, Footer } = Layout;
function App() {
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  useEffect(() => {});
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header style={{ background: "white" }}>
            <Nav type={type} setType={setType} user={user} />
          </Header>
          <Content>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/signin"
                element={
                  <SignIn setUser={setUser} setType={setType} type={type} />
                }
              />
              <Route path="/signup" element={<SignUp type={type} />} />
              <Route
                path="/holdermanage"
                element={<HolderManage type={type} />}
              />
              <Route
                path="/holderissue"
                element={<HolderIssue type={type} />}
              />
              <Route
                path="/holdersubmit"
                element={<HolderSubmit type={type} />}
              />
              <Route
                path="/issuermanage"
                element={<IssuerManage type={type} />}
              />
              <Route path="/holder">
                <Route path="request-vc" element={<Issuers type={type} />} />
                <Route path="modal" element={<IssuerListModal type={type} />} />
              </Route>
              <Route
                path="/issuerissue"
                element={<IssuerIssue user={user} type={type} />}
              />
            </Routes>
            <div style={{ height: "50px", background: "white" }}></div>
          </Content>
          <Footer>
            <FooterBar />
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
