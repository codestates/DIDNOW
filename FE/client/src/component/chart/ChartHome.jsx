import "./home.scss";
import Widget from "./components/widget/Widget";
import Featured from "./components/featured/Featured";
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="인증 요청 현황" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">인증 요청이 많았던 유저 리스트</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
