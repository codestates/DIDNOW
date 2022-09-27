import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "인증 요청 수",
        isMoney: false,
        link: "모든 인증 요청 수 보기",
        backgroundColor: "red",
      };
      break;
    case "order":
      data = {
        title: "인증 성공 현황",
        isMoney: false,
        link: "모든 인증 성공 현황 보기",
        backgroundColor: "green",
      };
      break;
    case "earning":
      data = {
        title: "접속 수",
        isMoney: false,
        link: "모든 접속 수 보기",
        backgroundColor: "blue",
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget red {data.backgroundColor}`}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
