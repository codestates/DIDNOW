import { Link } from "react-router-dom";
import ape from "../../img/homo.gif";
import "./style/notFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound--errorcode">
        <div style={{ fontWeight: "700" }}>NOT FOUND</div>
        <div>404</div>
        <div className="notfound--desc">존재하지 않는 주소입니다.</div>
        <div className="notfound--subdesc">
          다음부터는 길을 잃지 않게 조심하세요.
        </div>

        <Link className="notfound--desc--btn" to={"/home"}>
          홈으로
        </Link>
      </div>
      <div className="notfound--image--container">
        <img className="notfound--image" src={ape} alt=""></img>
      </div>
    </div>
  );
};

export default NotFound;
