import "./style/pdf.css";
import logo from "../img/didnow-icon.png";

const Pdf = ({ title, content, type, getDate, user }) => {
  const changeFormat = (date) => {
    const yyyy = date.slice(0, 4);
    const mm = date.slice(5, 7);
    const dd = date.slice(8, 10);
    return `${yyyy}년 ${mm}월 ${dd}일`;
  };

  return (
    <div className="pdf--page">
      <div className="pdf--page--inner">
        <div className="pdf--page--inner--inner">
          <div className="pdf--logo--container">
            <img className="pdf--logo" src={logo} alt="" />
          </div>
          <div className="pdf--title">{title.split("").join(" ")}</div>
          <div className="pdf--usernamebirth--container">
            <div className="pdf--username">{`이\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0름 : ${user.username}`}</div>
            <div className="pdf--userbirth">{`생년월일 : ${changeFormat(
              user.birthDay
            )}`}</div>
          </div>
          <div className="pdf--content">
            <div>{`내\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0용 : ${content}`}</div>
            <div>{`타\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0입 : ${type}`}</div>
            <div>{`인증일자 : ${changeFormat(getDate)}`}</div>
          </div>
          <div className="pdf--proof">위와 같은 사실을 증명합니다.</div>
          <div className="pdf--date">
            {`${new Date().getFullYear()} 년 ${new Date().getMonth()} 월 ${new Date().getDate()} 일`}
          </div>
          <div className="pdf--company">{"D I D N O W"}</div>
        </div>
      </div>
    </div>
  );
};

export default Pdf;
