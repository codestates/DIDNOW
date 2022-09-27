import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "코드스테이츠 수료증",
      customer: "박기범",
      date: "1 March",
      amount: 785,
      status: "Approved",
    },
    {
      id: 2235235,
      product: "코드스테이츠 수료증",
      customer: "김범석",
      date: "1 March",
      amount: 900,
      status: "Pending",
    },
    {
      id: 2342353,
      product: "코드스테이츠 수료증",
      customer: "홍길동",
      date: "1 March",
      amount: 35,
      status: "Pending",
    },
    {
      id: 2357741,
      product: "코드스테이츠 수료증",
      customer: "신영만",
      date: "1 March",
      amount: 920,
      status: "Approved",
    },
    {
      id: 2342355,
      product: "코드스테이츠 수료증",
      customer: "홍명보",
      date: "1 March",
      amount: 2000,
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">인증서 이름</TableCell>
            <TableCell className="tableCell">유저 이름</TableCell>
            <TableCell className="tableCell">날짜</TableCell>
            <TableCell className="tableCell">횟수</TableCell>
            <TableCell className="tableCell">인증상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{row.product}</div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
