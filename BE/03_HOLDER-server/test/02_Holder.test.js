// Issuer Signup + Signin
// Holder Signup + Signin

const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const axios = require("axios");

chai.use(chaiHttp);
const num = new Date().getTime();

let IssuerObj = {};
let HolderObj = {};
let VerifierObj = {};
let IssuerCookie = "";
let HolderCookie = "";
let VerifierCookie = "";

let HolderVC_ListObj = [];

describe("📙 Holder Login + CRUD", () => {
  it("🚀 #1 Holder Login", async () => {
    // Issuer Register
    await axios({
      url: "http://localhost:9991/aut/api/v1/register-issuer",
      method: "POST",
      data: {
        title: `testIssuer${num}`,
        email: `testIssuer${num}@gmail.com`,
        password: "1111",
        requiredVC: ["name", "birthDate"],
      },
      withCredential: true,
    });

    // Issuer Login
    const result1 = await axios({
      url: "http://localhost:9991/aut/api/v1/login-issuer",
      method: "POST",
      data: {
        email: `testIssuer${num}@gmail.com`,
        password: "1111",
      },
      withCredential: true,
    });

    IssuerCookie = result1.headers["set-cookie"][0].split(";")[0];
    IssuerObj = result1.data;
    assert.equal(result1.status, "200");
    assert.equal(result1.data.email, IssuerObj.email);

    // Holder Register
    await axios({
      url: "http://localhost:9991/aut/api/v1/register-holder",
      method: "POST",
      data: {
        username: `testHolder${num}`,
        email: `testHolder${num}@gmail.com`,
        password: "1111",
        birthDay: "2000-01-01",
        IssuerList: [IssuerObj._id],
      },
      withCredential: true,
    });

    // Holder Login
    const result2 = await axios({
      url: "http://localhost:9991/aut/api/v1/login-holder",
      method: "POST",
      data: {
        email: `testHolder${num}@gmail.com`,
        password: "1111",
      },
      withCredential: true,
    });
    HolderCookie = result2.headers["set-cookie"][0].split(";")[0];
    HolderObj = result2.data;

    assert.equal(result1.status, "200");

    // Verifier Register
    await axios({
      url: "http://localhost:9991/aut/api/v1/register-verifier",
      method: "POST",
      data: {
        title: `testVerifier${num}`,
        email: `testVerifier${num}@gmail.com`,
        password: `1111`,
        verifyList: ["졸업증명서"],
      },
      withCredential: true,
    });

    // Verifier Login
    const result3 = await axios({
      url: "http://localhost:9991/aut/api/v1/login-verifier",
      method: "POST",
      data: {
        email: `testVerifier${num}@gmail.com`,
        password: "1111",
      },
      withCredential: true,
    });
    VerifierCookie = result3.headers["set-cookie"][0].split(";")[0];
    VerifierObj = result3.data;

  });

  // Holder Update
  it("✅️ #2 Holder Update", (done) => {
    try {
      chai
        .request(server)
        .put(`/hol/api/v1/holder/${HolderObj._id}`)
        .set("Cookie", HolderCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(
            res.body.message,
            "성공적으로 Holder 업데이트 되었습니다."
          );
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  // Get A Holder
  it("✅️ #3 Get a Holder", (done) => {
    try {
      chai
        .request(server)
        .get(`/hol/api/v1/holder/${HolderObj._id}`)
        .set("Cookie", HolderCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body._id, HolderObj._id);
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });
});

describe("📙 Issuer 인증서 발급 준비", () => {
  // Create Issuer Verifiable Crential List
  it("🚀 #1 Craete Issuer Verifiable Crential List", async () => {
    try {
      await axios({
        url: `http://localhost:9992/iss/api/v1/verifiable-credential`,
        method: "POST",
        headers: {
          Cookie: IssuerCookie,
        },
        withCredential: true,
        data: {
          credentialTitle: "졸업증명서",
          IssuedBy: "코드스테이츠",
        },
      });

      assert.equal(result.status, "200");
      assert.equal(res.data, "Verifiable Credential이 생성되었습니다.");
    } catch (err) {}
  });

  it("🚀 #2 Craete IssuerUserList", async () => {
    const result = await axios({
      url: `http://localhost:9992/iss/api/v1/issuer-user/${IssuerObj._id}`,
      method: "POST",
      headers: {
        Cookie: IssuerCookie,
      },
      withCredential: true,
      data: {
        cr_name: HolderObj.username,
        cr_email: HolderObj.email,
        cr_birthDate: "2000-01-01",
        cr_certificateType: "블록체인 부트캠프",
        cr_certificateName: "5기",
        cr_certificateDate: "2022-01-01",
        cr_Nationality: "Korea",
        holderId: HolderObj._id,
      },
    });

    assert.equal(result.status, "200");
    assert.equal(
      result.data.message,
      "IssuerUserList가 성공적으로 저장되었습니다."
    );
  });
});

describe("📙 Holder Request Verifiable Credential To Issuer", () => {
  // request VC
  it("✅️ #1 request VC", (done) => {
    const data = {
      password: "1111",
      VC_title: "나의 인증서",
    };

    try {
      chai
        .request(server)
        .post(`/hol/api/v1/verify/request/${IssuerObj._id}`)
        .set("Cookie", HolderCookie)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body.IssuedBy, IssuerObj._id);
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  // Check Holder's VC List
  it("✅️ #2 Check Holder's VC List", (done) => {
    try {
      chai
        .request(server)
        .get(`/hol/api/v1/verify/vc-list/`)
        .set("Cookie", HolderCookie)
        .end((err, res) => {
          console.log(res.body);
          HolderVC_ListObj = res.body;
          assert.equal(res.status, "200");
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  // Request Verify VC To Verifier
  it("✅️ #3 Request Verify VC To Verifier", (done) => {
    const data = {
      password: "1111",
      vc_list: HolderVC_ListObj[0]._id,
    };

    try {
      chai
        .request(server)
        .get(`/hol/api/v1/verify/request-auth/${VerifyObj._id}`)
        .set("Cookie", HolderCookie)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, "200");
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });
});

describe("📙 Issuer + Delete 삭제", () => {
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
