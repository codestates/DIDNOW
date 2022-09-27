import React from "react";
import { useState } from "react";
import "./style/IssuerListModal.css";
import axios from "axios";

export default function IssuerListModal({ isSelect, setIsSelect, issuer }) {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const requestVC = () => {
    axios({
      url: `/api/v1/credential/request-vc/${issuer._id}`,
      method: "POST",
      data: {
        password: password,
        VC_title: title,
      },
      withCredentials: true,
    }).then((result) => {});
  };

  return (
    <div className="IssuerListModalContainer">
      <div className="ModalBox">
        <button className="ModalExit" onClick={() => setIsSelect(!isSelect)}>
          close
        </button>
        <div className="ModalInputGroup">
          <label>VC Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="ModalInputGroup">
          <label>비밀번호</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="ModalButton" onClick={requestVC}>
          인증요청
        </button>
      </div>
    </div>
  );
}
