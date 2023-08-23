import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CustomBarChart.scss";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomizeDateChart() {
  const [isLoading, setIsLoading] = useState(false);
  const [complete, setComplete] = useState();
  const [processing, setProcessing] = useState();
  const [cancel, setCancel] = useState();
  const [count, setCount] = useState();

  const [deactivate, setDeactivate] = useState();
  const [custom, setCustom] = useState(false);

  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);
  console.log(ShopOwner_id);
  const fetchData = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/order/OrderReports/${id}`
    );
    setIsLoading(true);
    if (data.success === true) {
      setIsLoading(false);
      setComplete(data.complete);
      setProcessing(data.processing);
      setCancel(data.Cancelled);
      setCount(data.count)

      console.log("products", data);
    } else {
      setIsLoading(false);
      console.log(data.message);
    }

    // .then(fetchData())
  };
  const data = [
    {
      name: "Total",
      value: count,
      fill: "#cccccc",
    },
    {
      name: "In Process",
      value: processing,
      fill: "#f5f531",
    },
    {
      name: "Complete",
      value: complete,
      fill: "#339933",
    },
    {
      name: "Cancel",
      value: cancel,
      fill: "#e60000",
    },
  ];
  useEffect(() => {
    fetchData(ShopOwner_id);
  });
  return (
    <div className="main-customizeDateChart">
      
      <div className="left-customizeDateChart">
        <div
          className="content-customizeDateChart"
          style={{ borderRightColor: "#cccccc", borderRightWidth: "3.5px" }}
        >
          <div className="head-customizeDateChart">{count}</div>
          <span className="con-customizeDateChart">Total Order Placed</span>
        </div>
        <div
          className="content-customizeDateChart"
          style={{ borderRightColor: "yellow", borderRightWidth: "3.5px" }}
        >
          <div className="head-customizeDateChart">{processing}</div>
          <span className="con-customizeDateChart">Orders InProcess</span>
        </div>

        <div
          className="content-customizeDateChart"
          style={{ borderRightColor: "green", borderRightWidth: "3.5px" }}
        >
          <div className="head-customizeDateChart">{complete}</div>
          <span className="con-customizeDateChart">Orders Complete</span>
        </div>

        <div
          className="content-customizeDateChart"
          style={{ borderRightColor: "red", borderRightWidth: "3.5px" }}
        >
          <div className="head-customizeDateChart">{cancel}</div>
          <span className="con-customizeDateChart">Orders Cancelled</span>
        </div>
      </div>
      <div className="report-chart">
        <BarChart
          width={600}
          height={370}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 25, right: 10 }}
          />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
      </div>
    </div>
  );
}

export default CustomizeDateChart;
