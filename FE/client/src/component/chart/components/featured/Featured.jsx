import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ value = 70 }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">인증 성공 현황</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={value}
            text={value + "%"}
            strokeWidth={5}
          />
        </div>
        <p className="title">인증 성공 현황</p>
        <p className="amount">{value}%</p>
        <p className="desc"></p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">저번주</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">88%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">저번 달</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">96%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
