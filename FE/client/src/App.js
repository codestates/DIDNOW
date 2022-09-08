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

const { Header, Content, Footer } = Layout;
function App() {
  const [user, setUser] = useState({});
  useEffect(() => {});
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header style={{ background: "white" }}>
            <Nav />
          </Header>
          <Content>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn setUser={setUser} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/holdermanage" element={<HolderManage />} />
              <Route path="/holderissue" element={<HolderIssue />} />
              <Route path="/holdersubmit" element={<HolderSubmit />} />
              <Route path="/issuermanage" element={<IssuerManage />} />
              <Route
                path="/issuerissue"
                element={<IssuerIssue user={user.data} />}
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
