import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Tab from "../Tab/Tab"
import './LineCharts.scss'

import axios from "axios";
import moment from "moment/moment";

function LineCharts() {
  const [sale, setSale] = useState();
  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);
  console.log(ShopOwner_id);


  const fetchData = async (id) => {
    var da=new Date().getFullYear()
  da=String(da)
  console.log(typeof da)
    const { data } = await axios.get(
      `http://localhost:5000/api/order/Sales/${id}?Year=${da}`
    );
    // setIsLoading(true);
    if (data.success === true) {
      setSale(data.sale);
      //   setIsLoading(false);
      //   setComplete(data.complete);
      //   setProcessing(data.processing);
      //   setCancel(data.Cancelled);
      //   setCount(data.count)

        console.log("sales", data);
    } else {
      //   setIsLoading(false);
      console.log(data.message);
    }

    // .then(fetchData())
  };
  const d =
    sale &&
    sale.map((s) => {
      return {
        date: s._id,
        sales: s.total,
      };
    });


  useEffect(() => {
    fetchData(ShopOwner_id);
  }, [ShopOwner_id]);
  return (
    <div className="main-linechart">
      <div className="left-linechart">
        {sale && sale.map((i)=>{
          return(
            <div
            className="content-customizelineChart"
            style={{ borderRightColor: "#6439ff", borderRightWidth: "3.5px" }}
          >
            <div className="head-customizelineChart">Rs {i.total}</div>
            <span className="con-customizelineChart">Sales of Month {i._id}</span>
          </div>
          )
        })}
      
      </div>
      <div className="right-linechart">
      <LineChart
        width={600}
        height={400}
        data={d}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="sales" stroke="#82ca9d" /> */}
      </LineChart>
      </div>
     
    </div>
  );
}

export default LineCharts;
