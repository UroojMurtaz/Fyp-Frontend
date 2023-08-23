import { useState, useEffect } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios"
import moment from "moment"



const Chart = ({ aspect, title }) => {
  const [sale, setSale] = useState();
  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);
  console.log(ShopOwner_id);


  const fetchData = async (id) => {
    var da=new Date().getFullYear()
  da=String(da)
  console.log(typeof da)
    const { data } = await axios.get(
      `http://localhost:5000/api/order/LastSixMonthsSales/${id}`
    );
    // setIsLoading(true);
    if (data.success === true) {
      setSale(data.sixMonthsSale);
        console.log("sales", sale);
      
    } else {
      //   setIsLoading(false);
      console.log(data.message);
    }

    // .then(fetchData())
  };

  const data =  sale && sale.map((s) => {
  return {
    date: s.k,
    sales: s.v,
  };
});
useEffect(() => {
  fetchData(ShopOwner_id);
  
}, [ShopOwner_id]);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
           {/* <YAxis/> */}
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;