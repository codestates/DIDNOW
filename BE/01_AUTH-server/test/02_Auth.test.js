const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const axios = require('axios')

chai.use(chaiHttp);
const num = new Date().getTime();
let IssuerObj = {};
let HolderObj = {};
let VerifierObj = {};
let IssuerCookie = "";
let HolderCookie = "";
let VerifierCookie = "";

const debug = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";

describe("📙 Issuer Register + Login + CRUD", () => {
  // 🚀 Issuer 회원가입
  it("✅️ Issuer 회원가입", (done) => {
    const user = {
      title: `testIssuer${num}`,
      email: `testIssuer${num}@gmail.com`,
      password: "1111",
      requiredVC: ["name", "birthDate"],
    };
    chai
      .request(server)
      .post("/aut/api/v1/register-issuer")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Issuer가 등록되었습니다.");
        done();
      });
  });
  // 🚀 Holder 회원가입
  it("✅️ Holder 회원가입", (done) => {
    const user = {
      username: `testHolder${num}`,
      email: `testHolder${num}@gmail.com`,
      password: `1111`,
      birthDay: `2000-01-01`,
      IssuerList: [IssuerObj._id],
    };
    chai
      .request(server)
      .post("/aut/api/v1/register-holder")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Holder가 등록되었습니다.");
        done();
      });
  });
  // 🚀 Verifier 회원가입
  it("✅️ Verifier 회원가입", (done) => {
    const user = {
      title: `testVerifier${num}`,
      email: `testVerifier${num}@gmail.com`,
      password: `1111`,
      verifyList: ["졸업증명서"],
    };
    chai
      .request(server)
      .post("/aut/api/v1/register-verifier")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Verifier가 등록되었습니다.");
        done();
      });
  });
});

describe("📙 Issuer Login + CRUD", () => {
  // Issuer 로그인
  it("✅️ #1 Issuer Login", (done) => {
    const user = {
      email: `testIssuer${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/aut/api/v1/login-issuer/")
      .send(user)
      .end((err, res) => {
        IssuerCookie = res.headers["set-cookie"][0].split(";")[0];
        IssuerObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testIssuer${num}@gmail.com`);
        assert.exists(res.body.walletAddress);
        done();
      });
  });

  // Logout Issuer
  it("✅️ #2 : Issuer Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", IssuerCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 Logout 되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("📙 Holder Login + CRUD", () => {
  // Holder 로그인
  it("✅️ #1 Holder Login", (done) => {
    const user = {
      email: `testHolder${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/aut/api/v1/login-holder/")
      .send(user)
      .end((err, res) => {
        HolderCookie = res.headers["set-cookie"][0].split(";")[0];
        HolderObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testHolder${num}@gmail.com`);
        assert.exists(res.body.walletAddress);
        done();
      });
  });
  // Logout Holder
  it("✅️ #2 : Holder Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", HolderCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 Logout 되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("📙 Verifier Login + CRUD", () => {
  // Verifier 로그인
  it("✅️ #1 Verifier Login", (done) => {
    const user = {
      email: `testVerifier${num}@gmail.com`,
      password: "1111",
    };

    try {
      chai
        .request(server)
        .post("/aut/api/v1/login-verifier/")
        .send(user)
        .end((err, res) => {
          VerifierCookie = res.headers["set-cookie"][0].split(";")[0];
          VerifierObj = res.body;
          assert.equal(res.status, "200");
          assert.equal(res.body.email, `testVerifier${num}@gmail.com`);
          done();
        });
    } catch (err) {
      debug && console.log(err);
    }
  });
  // Logout Verifier
  it("✅️ #2 : Verifier Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", VerifierCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 Logout 되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});
describe("📙 Issuer + Holder + Verifier Delete 삭제", () => {
  // Issuer Delete
  it("🚀 #1 Issuer Delete", (done) => {
    axios({
      url: `http://localhost:9992/iss/api/v1/issuer/${IssuerObj._id}`,
      method: "DELETE",
      headers: {
        Cookie: IssuerCookie,
      },
      withCredential: true,
    })
      .then((result) => {
        assert.equal(result.status, "200");
        assert.equal(result.data, "성공적으로 Issuer가 삭제되었습니다.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  // Holder Delete
  it("🚀 #2 Holder Delete", (done) => {
    axios({
      url: `http://localhost:9993/hol/api/v1/holder/${HolderObj._id}`,
      method: "DELETE",
      headers: {
        Cookie: HolderCookie,
      },
      withCredential: true,
    })
      .then((result) => {
        assert.equal(result.status, "200");
        assert.equal(result.data, "성공적으로 holder가 삭제되었습니다.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  // Verifier Delete
  it("🚀 #3 Verifier Delete", (done) => {
    axios({
      url: `http://localhost:9994/ver/api/v1/verifier/${VerifierObj._id}`,
      method: "DELETE",
      headers: {
        Cookie: VerifierCookie,
      },
      withCredential: true,
    })
      .then((result) => {
        assert.equal(result.status, "200");
        assert.equal(result.data, "성공적으로 verifier가 삭제되었습니다.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
