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

describe("π Issuer Register + Login + CRUD", () => {
  // π Issuer νμκ°μ
  it("βοΈ Issuer νμκ°μ", (done) => {
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
        assert.equal(res.body, "Issuerκ° λ±λ‘λμμ΅λλ€.");
        done();
      });
  });
  // π Holder νμκ°μ
  it("βοΈ Holder νμκ°μ", (done) => {
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
        assert.equal(res.body, "Holderκ° λ±λ‘λμμ΅λλ€.");
        done();
      });
  });
  // π Verifier νμκ°μ
  it("βοΈ Verifier νμκ°μ", (done) => {
    const user = {
      title: `testVerifier${num}`,
      email: `testVerifier${num}@gmail.com`,
      password: `1111`,
      verifyList: ["μ‘Έμμ¦λͺμ"],
    };
    chai
      .request(server)
      .post("/aut/api/v1/register-verifier")
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, "200");
        assert.equal(res.body, "Verifierκ° λ±λ‘λμμ΅λλ€.");
        done();
      });
  });
});

describe("π Issuer Login + CRUD", () => {
  // Issuer λ‘κ·ΈμΈ
  it("βοΈ #1 Issuer Login", (done) => {
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
  it("βοΈ #2 : Issuer Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", IssuerCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "μ±κ³΅μ μΌλ‘ Logout λμμ΅λλ€.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("π Holder Login + CRUD", () => {
  // Holder λ‘κ·ΈμΈ
  it("βοΈ #1 Holder Login", (done) => {
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
  it("βοΈ #2 : Holder Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", HolderCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "μ±κ³΅μ μΌλ‘ Logout λμμ΅λλ€.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});

describe("π Verifier Login + CRUD", () => {
  // Verifier λ‘κ·ΈμΈ
  it("βοΈ #1 Verifier Login", (done) => {
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
  it("βοΈ #2 : Verifier Logout", (done) => {
    try {
      chai
        .request(server)
        .post(`/aut/api/v1/logout/`)
        .set("Cookie", VerifierCookie)
        .end((err, res) => {
          assert.equal(res.status, "200");
          assert.equal(res.body, "μ±κ³΅μ μΌλ‘ Logout λμμ΅λλ€.");
        });
      done();
    } catch (err) {
      debug && console.log(err);
    }
  });
});
describe("π Issuer + Holder + Verifier Delete μ­μ ", () => {
  // Issuer Delete
  it("π #1 Issuer Delete", (done) => {
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
        assert.equal(result.data, "μ±κ³΅μ μΌλ‘ Issuerκ° μ­μ λμμ΅λλ€.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  // Holder Delete
  it("π #2 Holder Delete", (done) => {
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
        assert.equal(result.data, "μ±κ³΅μ μΌλ‘ holderκ° μ­μ λμμ΅λλ€.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  // Verifier Delete
  it("π #3 Verifier Delete", (done) => {
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
        assert.equal(result.data, "μ±κ³΅μ μΌλ‘ verifierκ° μ­μ λμμ΅λλ€.");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
