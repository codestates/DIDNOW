import React, { useState } from "react";
import "./style/IssuerList.css";
import IssuerListModal from "../component/IssuerListModal";
import { useNavigate } from "react-router-dom";

export default function IssuerList({ setIsSelect, isSelect, issuer, num }) {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  return (
    <>
      <div className="content">
        <h4 className="issuerContent">{num + 1}</h4>
        <h4 className="issuerContent">{issuer._id}</h4>
        <h4 className="issuerContent">{issuer.title}</h4>
        <button
          className="issuerContentButton"
          onClick={() => setIsClick(!isClick)}
        >
          {"인증서 요청"}
        </button>
        {isClick ? (
          <IssuerListModal
            issuer={issuer}
            isSelect={isClick}
            setIsSelect={setIsClick}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
