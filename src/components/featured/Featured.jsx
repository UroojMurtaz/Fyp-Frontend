import { useState,useEffect } from "react";
import './featured.scss'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";
import axios from "axios"


function Featured() {
  const [orders, setOrders] = useState();
    const [sale, setSales] = useState();
    const [complete, setComplete] = useState();
    const [processing, setProcessing] = useState();
    var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);
var a=0;
    const fetchData = async (id) => {
   
        const { data } = await axios.get(`http://localhost:5000/api/order/getOrdersDashboard/${id}`);
        if (data.success === true) {
        //   console.log(data)
          setOrders(data.count);
          setSales(data.sales)
          setComplete(data.complete)
          setProcessing(data.processing)
          
        } else {
          console.log(data.message);
        }
      };

    
      useEffect(() => {
        fetchData(ShopOwner_id);
      }, []);

      a=(complete/orders)*100
          console.log("a",a)
          a = Math.round(a * 10) / 10
    return (
        <div className="featured">
          <div className="top">
            <h1 className="title"><p className="title">Orders Complete Out of total Orders </p></h1>
            <MoreVertIcon fontSize="small" />
          </div>
          <div className="bottom">
            <div className="featuredChart">
              <CircularProgressbar value={a} text={`${a}%`} strokeWidth={5} />
            </div>
            <p className="title">Total sales made </p>
            <p className="amount">Rs{sale}</p>
            <p className="desc">
              Previous transactions processing. Last payments may not be included.
            </p>
            <br/>
            <br/>
            {/* <br/> */}
            {/* <div className="summary">
              <div className="item">
                <div className="itemTitle">Target</div>
                <div className="itemResult negative">
                  <KeyboardArrowDownIcon fontSize="small"/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Week</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      );
}

export default Featured