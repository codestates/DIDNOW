const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.use(chaiHttp);
const num = new Date().getTime();

describe("📙 Issuer Register + Login + CRUD", () => {
  let userObj = {};
  let cookie = "";

  it("Issuer Register", (done) => {
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
        cookie = res.headers["set-cookie"][0].split(';')[0];
        userObj = res.body;
        assert.equal(res.status, "200");
        assert.equal(res.body.email, `testIssuer${num}@gmail.com`);
        assert.exists(res.body.walletAddress);
        done();
        
      });
  });

  it("Issuer Update", (done)=>{
    const userUpdated = {
        title: `testIssuer${num} updated`,
      };

      // User Update
      try {
        chai
          .request(server)
          .put(`/api/v1/user/issuer/${userObj._id}`)
          .set('Cookie', cookie)
          .send(userUpdated)
          .end((err, res) => {
            assert.equal(res.status, "200");
            assert.equal(res.body.data.title, `testIssuer${num} updated`);
            done();
          });
      } catch (err) {
        console.log(err);
      }
      // User Delete
      
  })
  it("Issuer Delete", (done)=>{
    try {
        chai
          .request(server)
          .delete(`/api/v1/user/issuer/${userObj._id}`)
          .set('Cookie', cookie)
          .end((err, res) => {
            assert.equal(res.status, "200");
            assert.equal(res.body, "성공적으로 Issuer가 삭제되었습니다.");
        });
        done();
      } catch (err) {
        console.log(err);
      }
  })
});


