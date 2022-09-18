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


describe("🚀 VC 인증 준비(회원가입+로그인+UserList 생성)", () => {
  // Issuer 회원가입
  it("Issuer Register [회원가입]", (done) => {
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

  // Holder 회원가입
  it("Holder Register [회원가입]", (done) => {
    const user = {
      username: `testHolder${num}`,
      email: `testHolder${num}@gmail.com`,
      password: "1111",
      birthDay: "2000-01-01",
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

  // Verifier 회원가입
  it("Verifier Register [회원가입]", (done) => {
    const user = {
      title: `testVerifier${num}`,
      email: `testVerifier${num}@gmail.com`,
      password: "1111",
      verifyList: ["졸업증명서"],
    };
    try {
      chai
        .request(server)
        .post("/api/v1/auth/register-verifier")
        .send(user)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "Verifier가 등록되었습니다.");
          done();
        });
    } catch (err) {
      console.log(err);
    }
  });
  // Verifier 로그인
  it("Verifier Login", (done) => {
    const user = {
      email: `testVerifier${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/api/v1/auth/login-verifier/")
      .send(user)
      .end((err, res) => {
        cookie = res.headers["set-cookie"][0].split(";")[0];
        VerifierObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testVerifier${num}@gmail.com`);
        assert.include(res.body.verifyList, "졸업증명서");
        done();
      });
  });

  // Issuer 로그인
  it("Issuer Login", (done) => {
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
  // Issuer Create Verify Credential
  it("Issuer Create Verify Credential", (done) => {
    const body = {
      credentialTitle: "졸업증명서",
      IssuedBy: "코드스테이츠",
    };
    chai
      .request(server)
      .post("/api/v1/credential/verifiable-credential")
      .set("Cookie", cookie)
      .send(body)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Verifiable Credential이 생성되었습니다.");
        done();
      });
  });
  // Issuer Create IssuerUserList
  it("Issuer Create IssuerUserList", (done) => {
    const body = {
      cr_name: `testHolder${num}`,
      cr_email: `testHolder${num}@gmail.com`,
      cr_birthDate: "2000-01-01",
      cr_certificateType: "블록체인 부트캠프",
      cr_certificateName: "5기",
      cr_certificateDate: "2022-01-01",
      cr_Nationality: "Korea",
    };
    chai
      .request(server)
      .post(`/api/v1/user/issuer-user/${IssuerObj._id}`)
      .set("Cookie", cookie)
      .send(body)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body.data.cr_name, `testHolder${num}`);
        assert.equal(res.body.data.cr_email, `testHolder${num}@gmail.com`);
        assert.equal(
          res.body.message,
          "IssuerUserList가 성공적으로 저장되었습니다."
        );
        done();
      });
  });
});
describe("🚀 VC 발급 (Holder => Issuer)", () => {
  // Holder 로그인
  it("Holder Login", (done) => {
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
  // Request VC
  it("Request Verifiable Credential", (done) => {
    const body = {
      password: "1111",
      VC_title: "testHolder`s 졸업증명서",
    };
    try{

        chai
          .request(server)
          .post(`/api/v1/credential/request-vc/${IssuerObj._id}`)
          .set("Cookie", cookie)
          .send(body)
          .end((err, res) => {
            assert.equal(res.status, "200");
            assert.exists(res.body.originalVC);
            assert.equal(res.body.IssuedBy, IssuerObj._id);
            assert.equal(
              res.body.originalVC[0].sub,
              `did:klay:${HolderObj.walletAddress.slice(2)}`
            );
            done();
          });
    }catch(err){
        console.log(err);
        done();
    }
  });
});

describe("🚀 VC 인증 요청 및 진행 (Holder => Verifier)", () => {
  // Holder 로그인
  it("Holder Login", (done) => {
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
  // Create Verify Request
  it("Create Verify Request", (done) => {
    let HolderVC_List_Obj = {};
    chai
      .request(server)
      .get(`/api/v1/credential/get-holder-vc-list/`)
      .set("Cookie", cookie)
      .end((err, res) => {
        HolderVC_List_Obj = res.body[0];

        const body = {
          password: "1111",
          vc_list: HolderVC_List_Obj._id,
          completeAt: "",
        };
        chai
          .request(server)
          .post(`/api/v1/credential/verifier/request-auth/${VerifierObj._id}`)
          .set("Cookie", cookie)
          .send(body)
          .end((err, res) => {
            assert.equal(res.status, "200");
            assert.exists(res.body.data.originalVP);
            assert.equal(res.body.data.requestOwner, HolderObj._id);
            assert.equal(res.body.message, "success");
            done();
          });
      });
  });

  // Verifier 로그인
  it("Verifier Login", (done) => {
    const user = {
      email: `testVerifier${num}@gmail.com`,
      password: "1111",
    };
    chai
      .request(server)
      .post("/api/v1/auth/login-verifier/")
      .send(user)
      .end((err, res) => {
        cookie = res.headers["set-cookie"][0].split(";")[0];
        VerifierObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testVerifier${num}@gmail.com`);
        assert.include(res.body.verifyList, "졸업증명서");
        done();
      });
  });

  it("Close Verify Request", (done) => {
    let verifyListObj = {};
    // get verify request list
    chai
      .request(server)
      .get(`/api/v1/credential/find/request-auths`)
      .set("Cookie", cookie)
      .end((err, res) => {
        verifyListObj = res.body[0];

        // Close Verification
        chai
          .request(server)
          .post(`/api/v1/credential/auth-vp/${verifyListObj._id}`)
          .set("Cookie", cookie)
          .end((err, res) => {
            assert.equal(res.body, "success");
            done();
          });
      });
  });
});
