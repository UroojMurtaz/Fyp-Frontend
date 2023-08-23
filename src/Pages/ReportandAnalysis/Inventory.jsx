import { useState, useEffect } from "react";
import "./inventory.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import format from "date-fns/format";
import Tab from "../../components/Tab/Tab";
import axios from "axios";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell,LabelList } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6439ff", "#8a72e2", "#a79fc9", "#625a81"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function InventoryReport() {
    const [cat,setCat]=useState()
    var ShopOwner_id = localStorage.getItem("UserId");
    ShopOwner_id = JSON.parse(ShopOwner_id);
    const fetchData = async (id) => {
      const { data } = await axios.get(
        `http://localhost:5000/api/categoryWiseProduct/${id}`);
      if (data.success === true) {
        setCat(data.Count)
        console.log(cat)
        // console.log("orderCount", data);
      } else {
        console.log(data.message);
      }
  
      // .then(fetchData())
    };
 
  useEffect(()=>{
    fetchData(ShopOwner_id)
  },[])

  var count=0;
  const data =cat && cat.map((i)=>{
    count=count+1;
    return{
      name:`Category ${count}`,
      value:i.count,
      catName:i.name,

    }
  });

  

  

  return (
    <div className="InventoryReport">
      <Sidebar />
      <div className="InventoryReportContainer">
        <Navbar />
        <div className="Inventory-report-main">
          <Tab />
        </div>
        <div className="InventoryReport-main">
          <div className="inventory-report-Left">
            <h1>Product Details</h1>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {cat && cat.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Pie
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
              <Tooltip  />
            </PieChart>
          </div>
          <div className="inventory-report-Right">
            <h1>Category Details</h1>
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
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
                 
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryReport;
