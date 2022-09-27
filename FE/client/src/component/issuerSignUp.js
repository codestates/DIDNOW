import "./style/issuerSignUp.css";
import { Row, Col, message, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WalletFilled } from "@ant-design/icons";
import QrCodeModal from "./qrCodeModal";
import * as KlipAPI from "../component/UseKlip";

const { Option } = Select;

const IssuerSignUp = () => {
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [myAddress, setMyAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {});
  useEffect(() => {}, []);
  const requiredVCList = ["이름", "이메일", "생년월일", "전화번호", "주소"];
  const navigate = useNavigate();
  const [issuerInfo, setIssuerInfo] = useState({
    email: "",
    password: "",
    title: "",
    registNumber: "",
    requiredVC: "",
    desc: "",
    walletAddress: "",
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    issuerInfo[e.target.id] = e.target.value;
    setIssuerInfo(issuerInfo);
  };
  const validate = async () => {
    if (issuerInfo.email === "") {
      message.error("이메일을 입력해주세요.");
    } else if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        issuerInfo.email
      )
    ) {
      message.error("이메일을 주소 형식을 확인해주세요.");
    } else if (issuerInfo.password === "") {
      message.error("비밀번호를 입력해주세요.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
        issuerInfo.password
      )
    ) {
      message.error("비밀번호를 형식에 맞춰 정확히 입력해주세요.");
    } else if (!isCorrect) {
      message.error("비밀번호 확인이 일치하지 않습니다");
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/.test(issuerInfo.title)) {
      message.error("기관명을 정확히 입력해주세요.");
    } else if (issuerInfo.registNumber === "") {
      message.error("사업자 등록번호를 입력해주세요.");
    } else if (issuerInfo.requiredVC.length < 1) {
      message.error("1개 이상의 요구사항을 선택해주세요.");
    } else if (myAddress === "") {
      message.error("KLIP 지갑을 연동해주세요.");
    } else {
      let res = await axios({
        url: `${process.env.REACT_APP_AUTH}/aut/api/v1/register-issuer`,
        method: "POST",
        data: {
          email: issuerInfo.email,
          password: issuerInfo.password,
          title: issuerInfo.title,
          requiredVC: [...issuerInfo.requiredVC],
          // desc: issuerInfo.desc,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.info(res.data);
        navigate("/home");
      }
    }
  };

  const qrModalOpen = () => {
    setModalOpen(true);
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      setModalOpen(false);
    });
  };

  // requiredVC 변경
  const changeRequiredVC = (e) => {
    setIssuerInfo((prev) => {
      return { ...prev, requiredVC: e };
    });
  };
  return (
    <div>
      <div className="issuersignup--title">📝 발행자 회원 가입</div>
      <div className="issuersignup--description">
        <div>발행자 회원으로 가입하는 기관 고객분들은</div>
        <div>
          회원들이 등록받을 인증서를 직접 관리할 수 있습니다.
          <div> 인증서를 블록체인에등록할 수 있습니다.</div>
        </div>
      </div>

      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          이메일
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="email"
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">
            이메일 형식으로 입력해주세요. ex{")"}abc123@didnow.com
          </div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          비밀번호
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="password"
            onChange={onchange}
            id="password"
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">
            8-20글자의 영어, 숫자, 특수문자 {"(~!@#$%^&*+)"}를 사용하여야합니다.
          </div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          비밀번호 확인
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="password"
            onChange={(e) => {
              return e.target.value === issuerInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">
            비밀번호를 동일하게 다시 입력해주세요.
          </div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          기관명
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="title"
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">
            한글 ,영어, 숫자를 사용해주세요.
          </div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          사업자 등록번호
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="registNumber"
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">사업자 등록번호를 입력해주세요.</div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          필수 요구사항
        </Col>
        <Col span={18}>
          <Select
            mode="tags"
            style={{
              width: "100%",
              borderTop: "0",
              borderLeft: "0",
              borderRight: "0",
              borderBottom: "1px solid black",
            }}
            onChange={changeRequiredVC}
          >
            {requiredVCList.map((e, idx) => {
              return <Option key={e}>{e}</Option>;
            })}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">
            필수적으로 제공 받아야할 정보를 선택해주세요.
          </div>
        </Col>
      </Row>
      <Row className="issuersignup--row">
        <Col span={6} className="signup--col">
          기관소개
        </Col>
        <Col span={18}>
          <input
            className="issuersignup--input"
            type="text"
            onChange={onchange}
            id="desc"
          />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <div className="validate--label">기관을 소개해주세요.</div>
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">KLIP 연결</span>
        </Col>
        <Col span={18}>
          <button
            onClick={() => {
              qrModalOpen();
            }}
            className="signup--klip--btn"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WalletFilled /> {"\u00A0"}KLIP 지갑 연결
            </div>
          </button>
          <QrCodeModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            qrvalue={qrvalue}
            setQrvalue={setQrvalue}
          />
        </Col>
      </Row>
      <Row className="holdersignup--row">
        <Col span={6} style={{ display: "flex" }}>
          <span className="signup--label">지갑주소</span>
        </Col>
        <Col span={18}>
          <div>{myAddress}</div>
        </Col>
      </Row>
      <Row>
        <button className="signup--btn" onClick={validate}>
          가입 완료
        </button>
      </Row>
    </div>
  );
};

export default IssuerSignUp;
