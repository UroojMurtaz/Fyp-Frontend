import { useState, useRef, useEffect } from "react";
import "./sales.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import InfoIcon from "@mui/icons-material/Info";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ArticleIcon from "@mui/icons-material/Article";
import Barchart from "../../components/chart/BarChart";
import CustomizeDateChart from "../../components/chart/CustomrBarChart";
import moment from "moment/moment";
import LineCharts from "../../components/chart/LineCharts";
import { useNavigate } from "react-router-dom";
import Tab from "../../components/Tab/Tab"

import axios from "axios";
import { toast } from "react-toastify";

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

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Sales() {
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [custom, setCustom] = useState(false);
  const [main, setMain] = useState(true);

  const [complete, setComplete] = useState();
  const [processing, setProcessing] = useState();
  const [cancel, setCancel] = useState();
  const [count, setCount] = useState();


  const [isActive, setIsActive] = useState(true);
  const [rej, setRej] = useState(false);
  const navigate=useNavigate()

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handle = (id) => {
    setMain(false);
    setCustom(true);
    const s = moment(Date.parse(range[0].startDate)).format("YYYY-MM-DD ");
    const e = moment(Date.parse(range[0].endDate)).format("YYYY-MM-DD ");
    setStart(s);
    setEnd(e);
    if(start){
      fetchData(id)
    }
    
    
  };

  const Accept = () => {
    setIsActive((current) => !current);
    setRej(false);
  };

  // console.log(start);

  const Reject = () => {
    setRej((current) => !current);
    setIsActive(false);
  };

  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);
  // console.log("ShopOwner_id",ShopOwner_id);
  var click=0;
  const fetchData = async (id) => {
    click=click+1;
console.log(click)
    setMain(false);
    setCustom(true);
    console.log("my",id)
    const s = moment(Date.parse(range[0].startDate)).format("YYYY-MM-DD ");
    const e = moment(Date.parse(range[0].endDate)).format("YYYY-MM-DD ");
    setStart(s);
    setEnd(e);
    console.log(start)
    console.log(end)
    const { data } = await axios.get(
      `http://localhost:5000/api/order/OrderReports/${id}?Start=${start}&End=${end}`);
    setIsLoading(true);
    if (data.success === true) {
      console.log("please wait")
      setIsLoading(false);
      setComplete(data.complete);
      setProcessing(data.processing);
      setCancel(data.Cancelled);
      setCount(data.count)
      console.log(cancel)

      console.log("orderCount", data);
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
  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        <div></div>
        <div className="report-main">
        <Tab/>
        </div>
        <div className="report-between">
          <span style={{ marginLeft: "20px", marginRight: "16px" }}>
            Select Custom Date
          </span>
          <div className="calendarWrap">
            <input
              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
                range[0].endDate,
                "MM/dd/yyyy"
              )}`}
              readOnly
              className="inputBox"
              onClick={() => setOpen((open) => !open)}
            />

            <div ref={refOne}>
              {open && (
                <DateRangePicker
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={2}
                  direction="horizontal"
                  className="calendarElement"
                />
              )}
            </div>
          </div>
          <span
            style={{
              marginLeft: "20px",
              marginRight: "16px",
              color: "purple",
              fontSize: "15px",
              border: "1px solid purple",
              padding: "5px",
            }}
            onClick={() => fetchData(ShopOwner_id)}
          >
            Go
          </span>
        </div>

        
        <div>
            <LineCharts/>
        </div>
         
       
      </div>
    </div>
  );
}

export default Sales;
