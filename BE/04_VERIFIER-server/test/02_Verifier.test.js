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
let VerifyRequestList = [];

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

  // Verifier Update
  it("✅️ #2 Verifier Update", async () => {
    try {
      const result3 = await axios({
        url: `http://localhost:9994/ver/api/v1/verifier/${VerifierObj._id}`,
        method: "PUT",
        headers: {
          Cookie: VerifierCookie,
        },
        withCredential: true,
        data: {
          verifyList: ["졸업증명서", "성인인증서"],
        },
      });
      assert.equal(result3.status, "200");
      assert.equal(
        result3.data.message,
        "성공적으로 Verifier 업데이트 되었습니다."
      );
    } catch (err) {
      console.log(err);
    }
  });

  // Get A Verifier
  it("✅️ #3 Get a Verifier", async () => {
    const result4 = await axios({
      url: `http://localhost:9994/ver/api/v1/verifier/${VerifierObj._id}`,
      method: "GET",
      headers: {
        Cookie: VerifierCookie,
      },
      withCredential: true,
    });

    assert.equal(result4.status, "200");
    assert.equal(result4.data._id, VerifierObj._id);
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
  it("🚀 #1 request VC", async () => {
    const result = await axios({
      url: `http://localhost:9993/hol/api/v1/verify/request/${IssuerObj._id}`,
      method: "POST",
      headers: {
        Cookie: HolderCookie,
      },
      data: {
        password: "1111",
        VC_title: "test VC",
      },
      withCredential: true,
    });
    assert.equal(result.status, "200");
    assert.equal(result.data.IssuedBy, IssuerObj._id);
  });

  // Check Holder's VC List
  it("🚀 #2 Check Holder's VC List", async () => {
    const result = await axios({
      url: `http://localhost:9993/hol/api/v1/verify/vc-list`,
      method: "GET",
      headers: {
        Cookie: HolderCookie,
      },
      withCredential: true,
    });
    HolderVC_ListObj = result.data;
    assert.equal(result.status, "200");
  });

  // Request Verify VC To Verifier
  it("🚀 #3 Request Verify VC To Verifier", async () => {
    const result = await axios({
      url: `http://localhost:9993/hol/api/v1/verify/request-auth/${VerifierObj._id}`,
      method: "POST",
      headers: {
        Cookie: HolderCookie,
      },
      data: {
        password: "1111",
        vc_list: HolderVC_ListObj[0]._id,
      },
      withCredential: true,
    });
    assert.equal(result.status, "200");
  });
});

describe("📙 Holder Request Verifiable Credential To Issuer", () => {
  // Verify List 확인
  it("✅️ #1 Verify List 확인", async () => {
    const result = await axios({
      url: `http://localhost:9994/ver/api/v1/verify/find/all`,
      method: "GET",
      headers: {
        Cookie: VerifierCookie,
      },
      withCredential: true,
    });
    VerifyRequestList = result.data;
    assert.isTrue(result.status == 200);
  });

  // Close Verify Request
  it("✅️ #2 Close Verify Request", async () => {
    const result = await axios({
      url: `http://localhost:9994/ver/api/v1/verify/close-vp/${VerifyRequestList[0]._id}`,
      method: "POST",
      headers: {
        Cookie: VerifierCookie,
      },
      withCredential: true,
    });
    assert.isTrue(result.data == "success");
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
