import { Breadcrumb } from "antd";
import status from "../../img/status.png";

const Verifierstatus = () => {
  return (
    <div className="status">
      <Breadcrumb className="holdermanage--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/verifier/status">Status</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <div
          style={{
            position: "absolute",
            width: " 90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "1.0",
            color: "black",
            fontWeight: "900",
            zIndex: "2",
            flexDirection: "column",
            margin: "5%",
          }}
        >
          <div style={{ fontSize: "5vmax" }}>🚧</div>
          <div style={{ fontSize: "3vmax" }}>개발중입니다.</div>
        </div>
        <div
          style={{
            opacity: "0.5",
            zIndex: "1",
            margin: "5%",
          }}
        >
          <img src={status} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Verifierstatus;
