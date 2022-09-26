import { Col, Modal, Row } from "antd";
import QRCode from "qrcode.react";

const QrCodeModal = ({ modalOpen, setModalOpen, qrvalue, setQrValue }) => {
  const handleCancel = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      style={{ borderRadius: "50px" }}
      title="KLIP 지갑 연동"
      open={modalOpen}
      onCancel={handleCancel}
      width="50%"
      footer={[]}
    >
      <Row>
        <Col span={12}>
          <QRCode value={qrvalue} size={256} />
        </Col>
        <Col span={12}>
          <div
            style={{ fontSize: "2rem", fontWeight: "700", margin: "0 0 5% 0" }}
          >
            KLIP 지갑 연동
          </div>
          <div>카메라로 QR Code를 인식하여</div>
          <div>지갑 주소를 등록해 보세요.</div>
          <div>
            <span style={{ fontWeight: "700" }}>DIDNOW</span>의 서비스를
            이용하기 위해서는
          </div>
          <div>KLIP 서비스에 가입 돼있어야 합니다.</div>
          <div style={{ margin: "5% 0 0 0" }}>
            <a
              style={{
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                textDecoration: "underline",
              }}
              href="https://www.kakaocorp.com/page/service/service/Klip"
            >
              {`📎 KLIP 가입하러 가기`}
            </a>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default QrCodeModal;
