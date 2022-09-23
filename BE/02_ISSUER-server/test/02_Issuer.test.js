const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const axios = require("axios");

chai.use(chaiHttp);
const num = new Date().getTime();

let IssuerObj = {};
let HolderObj = {};
let IssuerCookie = "";
let HolderCookie = "";

let VerifiableCredential;
let IssuerUserList;

describe("📙 Issuer Login + CRUD", () => {
  it("🚀 #1 Issuer Login", async () => {
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
    assert.isTrue(true);

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

    // // Holder Login
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
  });

  // Issuer Update
  it("✅️ #2 Issuer Update", (done) => {
    try {
      chai
        .request(server)
        .put(`/iss/api/v1/issuer/${IssuerObj._id}`)
        .set("Cookie", IssuerCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(
            res.body.message,
            "성공적으로 Issuer 업데이트 되었습니다."
          );
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  // Get A Issuer
  it("✅️ #3 Get a Issuer", (done) => {
    try {
      chai
        .request(server)
        .get(`/iss/api/v1/issuer/${IssuerObj._id}`)
        .set("Cookie", IssuerCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body._id, IssuerObj._id);
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });
});

describe("📙 Issuer 인증서 발급 준비", () => {
  // Create Verifiable Crential List
  it("✅️ #1 Craete Verifiable Crential List", (done) => {
    const data = {
      credentialTitle: "졸업증명서",
      IssuedBy: "코드스테이츠",
    };

    try {
      chai
        .request(server)
        .post(`/iss/api/v1/verifiable-credential`)
        .set("Cookie", IssuerCookie)
        .send(data)
        .end((err, res) => {
          VerifiableCredential = res.body.data;
          assert.equal(res.status, "200");
          assert.equal(res.body.message, "Verifiable Credential이 생성되었습니다.");
        });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  it("✅️ #2 Craete IssuerUserList", (done) => {
    const data = {
      cr_name: HolderObj.username,
      cr_email: HolderObj.email,
      cr_birthDate: `"2000-01-01"`,
      cr_certificateType: `"블록체인 부트캠프"`,
      cr_certificateName: `"15기"`,
      cr_certificateDate: `"2022-01-01"`,
      cr_Nationality: `"Korea"`,
      holderId: HolderObj._id,
    };

    try {
      chai
        .request(server)
        .post(`/iss/api/v1/issuer-user/${IssuerObj._id}`)
        .set("Cookie", IssuerCookie)
        .send(data)
        .end((err, res) => {
          IssuerUserList = res.body.data;
          assert.equal(res.status, "200");
          assert.equal(
            res.body.message,
            "IssuerUserList가 성공적으로 저장되었습니다."
          );
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


  // Verifiable Crential 삭제
  it("✅️ #3 VerifiableCredentail Delete", (done) => {
    axios({
      url: `http://localhost:9992/iss/api/v1/verifiable-credential/${VerifiableCredential._id}`,
      method: "DELETE",
      headers: {
        Cookie: IssuerCookie,
      },
      withCredential: true,
    })
      .then((result) => {
        assert.equal(result.status, "200");
        assert.equal(result.data, "VC가 성공적으로 삭제 되었습니다.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // IssuerUserList 삭제
  it("✅️ #4 Holder Delete", (done) => {
    axios({
      url: `http://localhost:9992/iss/api/v1/issuer-user/${IssuerUserList._id}`,
      method: "DELETE",
      headers: {
        Cookie: IssuerCookie,
      },
      withCredential: true,
    })
      .then((result) => {
        assert.equal(result.status, "200");
        assert.equal(result.data, "IssuerUser가 성공적으로 삭제되었습니다.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


});
