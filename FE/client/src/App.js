import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.min.css";

// import componets & pages
import Home from "./page/home";
import Nav from "./component/nav";
import SignIn from "./page/signIn";
import SignUp from "./page/holderSignUp";
import FooterBar from "./component/footerBar";
import UserManage from "./page/holderManage";
import UserIssue from "./page/holderIssue";
import UserSubmit from "./page/holderSubmit";

const { Header, Content, Footer } = Layout;
function App() {
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
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/usermanage" element={<UserManage />}></Route>
              <Route path="/userissue" element={<UserIssue />}></Route>
              <Route path="/usersubmit" element={<UserSubmit />}></Route>
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
