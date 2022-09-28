import React from "react";
import "./style/responsive.css";

export default function Responsive() {
  return (
    <div class="container">
      <div className="wrapper">
        <img style={{width:"80%"}} src="https://media.compliancesigns.com/media/catalog/product/i/n/information-sign-nhe-31910_ybstr_1000.gif" alt="" />
        <h1 className="description">
          <b>반응형 웹은 공사중입니다.</b>
          <br />
          PC 버전으로 접속해주세요
        </h1>
      </div>
    </div>
  );
}
