import { useState,useEffect } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios"
import moment from "moment"

const List = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState();
  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);

  const fetchData = async (id) => {
   
    const { data } = await axios.get(`http://localhost:5000/api/order/getOrdersDashboard/${id}`);
    if (data.success === true) {
      console.log(data.sale)
      setProducts(data.sale);
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    fetchData(ShopOwner_id);
  }, [refresh]);


  const rows=products && products.map((order) => {
    return {
      id: order._id,
      product: order.shopOwner[0].name,
      img:`${order.shopOwner[0].images[0].imageUrl}`,
      customer: order.user[0].name,
      amount: order.totalPrice,
      status: order.orderStatus,
      _id:order.trackigID,
      date:`${moment(order.createdAt).format("DD-MMM-YYYY")}`
    };
  });
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
         <TableCell className="tableCell">Tracking ID</TableCell>
         <TableCell className="tableCell">Product</TableCell>
         <TableCell className="tableCell">Customer</TableCell>
         <TableCell className="tableCell">Date</TableCell>
         <TableCell className="tableCell">Amount</TableCell>
         <TableCell className="tableCell">Payment Method</TableCell>
         <TableCell className="tableCell">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="tableCell">{row._id}</TableCell>
            <TableCell className="tableCell">
                <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                {row.product}
                </div>
                
            </TableCell>
            <TableCell className="tableCell">{row.customer}</TableCell>
            <TableCell className="tableCell">{row.date}</TableCell>
            <TableCell className="tableCell">{row.amount}</TableCell>
            <TableCell className="tableCell">{row.method}</TableCell>
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