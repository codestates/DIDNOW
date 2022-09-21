const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.use(chaiHttp);
const num = new Date().getTime();
let IssuerObj = {};
let HolderObj = {};
let VerifierObj = {};
let cookie = "";

const debug = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";

describe("📙 Issuer Register + Login + CRUD", () => {
  // 🚀 Issuer 회원가입
  it("🚀 Issuer 회원가입", (done) => {
    const user = {
      title: `testIssuer${num}`,
      email: `testIssuer${num}@gmail.com`,
      password: "1111",
      requiredVC: ["name", "birthDate"],
    };
    chai
      .request(server)
      .post("/api/v1/auth/register-issuer")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Issuer가 등록되었습니다.");
        done();
      });
  });
  // 🚀 Holder 회원가입
  it("🚀 Holder 회원가입", (done) => {
    const user = {
      username: `testHolder${num}`,
      email: `testHolder${num}@gmail.com`,
      password: `1111`,
      birthDay: `2000-01-01`,
      IssuerList: ["632800f9914130afc4350b50"],
    };
    chai
      .request(server)
      .post("/api/v1/auth/register-holder")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Holder가 등록되었습니다.");
        done();
      });
  });
  // 🚀 Verifier 회원가입
  it("🚀 Verifier 회원가입", (done) => {
    const user = {
      title: `testVerifier${num}`,
      email: `testVerifier${num}@gmail.com`,
      password: `1111`,
      verifyList: ["졸업증명서"],
    };
    chai
      .request(server)
      .post("/api/v1/auth/register-verifier")
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
  it("🚀 Issuer Login", (done) => {
    const user = {
      email: `testIssuer${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/api/v1/auth/login-issuer/")
      .send(user)
      .end((err, res) => {
        cookie = res.headers["set-cookie"][0].split(";")[0];
        IssuerObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testIssuer${num}@gmail.com`);
        assert.exists(res.body.walletAddress);
        done();
      });
  });
  // Update Issuer
  it("🚀 CRUD #2 : Issuer Update", (done) => {
    const userUpdated = {
      title: `testIssuer${num} updated`,
    };

    try {
      chai
        .request(server)
        .put(`/api/v1/user/issuer/${IssuerObj._id}`)
        .set("Cookie", cookie)
        .send(userUpdated)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.data.title, `testIssuer${num} updated`);
          done();
        });
    } catch (err) {
      debug && console.log(err);
    }
    // User Delete
  });
  // Get a Issuer
  it("🚀 CRUD #2 : Get a Issuer", (done) => {
    try {
      chai
        .request(server)
        .get(`/api/v1/user/issuer/${IssuerObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.title, `testIssuer${num} updated`);
          assert.equal(res.body._id, IssuerObj._id);
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });

  // Delete Issuer
  it("🚀 CRUD #3 : Issuer Delete", (done) => {
    try {
      chai
        .request(server)
        .delete(`/api/v1/user/issuer/${IssuerObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 Issuer가 삭제되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("📙 Holder Login + CRUD", () => {
  // Holder 로그인
  it("🚀 Holder Login", (done) => {
    const user = {
      email: `testHolder${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/api/v1/auth/login-holder/")
      .send(user)
      .end((err, res) => {
        cookie = res.headers["set-cookie"][0].split(";")[0];
        HolderObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testHolder${num}@gmail.com`);
        assert.exists(res.body.walletAddress);
        done();
      });
  });
  // Update Holder 
  it("🚀 CRUD #2 : Holder Update", (done) => {
    const userUpdated = {
      username: `testHolder${num} updated`,
    };

    try {
      chai
        .request(server)
        .put(`/api/v1/user/holder/${HolderObj._id}`)
        .set("Cookie", cookie)
        .send(userUpdated)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.data.username, `testHolder${num} updated`);
          done();
        });
    } catch (err) {
      debug && console.log(err);
    }
  });
  // Get a Holder
  it("🚀 CRUD #2 : Get a Holder", (done) => {
    try {
      chai
        .request(server)
        .get(`/api/v1/user/holder/${HolderObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.username, `testHolder${num} updated`);
          assert.equal(res.body._id, HolderObj._id);
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });

  // Delete Holder
  it("🚀 CRUD #3 : Holder Delete", (done) => {
    try {
      chai
        .request(server)
        .delete(`/api/v1/user/holder/${HolderObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 holder가 삭제되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("📙 Verifier Login + CRUD", () => {
  // Verifier 로그인
  it("🚀 Verifier Login", (done) => {
    const user = {
      email: `testVerifier${num}@gmail.com`,
      password: "1111",
    };

    try {
      chai
        .request(server)
        .post("/api/v1/auth/login-verifier/")
        .send(user)
        .end((err, res) => {
          cookie = res.headers["set-cookie"][0].split(";")[0];
          VerifierObj = res.body;
          assert.equal(res.status, "200");
          assert.equal(res.body.email, `testVerifier${num}@gmail.com`);
          done();
        });
    } catch (err) {
      debug && console.log(err);
    }
  });
  // Update Verifier 
  it("🚀 CRUD #2 : Verifier Update", (done) => {
    const userUpdated = {
      title: `testVerifier${num} updated`,
    };

    try {
      chai
        .request(server)
        .put(`/api/v1/user/verifier/${VerifierObj._id}`)
        .set("Cookie", cookie)
        .send(userUpdated)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.data.title, `testVerifier${num} updated`);
          done();
        });
    } catch (err) {
      debug && console.log(err);
    }
  });
  // Get a Verifier
  it("🚀 CRUD #2 : Get a Verifier", (done) => {
    try {
      chai
        .request(server)
        .get(`/api/v1/user/verifier/${VerifierObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.title, `testVerifier${num} updated`);
          assert.equal(res.body._id, VerifierObj._id);
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });

  // Delete Verifier
  it("🚀 CRUD #3 : Verifier Delete", (done) => {
    try {
      chai
        .request(server)
        .delete(`/api/v1/user/verifier/${VerifierObj._id}`)
        .set("Cookie", cookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "성공적으로 verifier가 삭제되었습니다.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});
