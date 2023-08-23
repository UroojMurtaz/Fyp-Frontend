import { useState,useEffect } from "react";
import './Widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios"

function Widget({ type }) {
    const [orders, setOrders] = useState();
    const [sale, setSales] = useState();
    const [complete, setComplete] = useState();
    const [processing, setProcessing] = useState();
  const [refresh, setRefresh] = useState();
  const [file, setFile] = useState();
  const [ publicId, setpublicId] = useState();
  const [imageUrl, setimageUrl] = useState();
  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);


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
      }, [refresh]);

    let data;

    //temporary
    const amount = 100;
    const diff = 20;


    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: <ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }} />,

            };
            break;
        case "earning":
            data = {
                title: "EARNING",
                isMoney: true,
                link: "View net earnings",
                icon: <MonetizationOnOutlinedIcon className="icon"
                    style={{
                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                        color: "green"
                    }} />,

            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: <AccountBalanceWalletOutlinedIcon className="icon"
                    style={{
                        backgroundColor: "rgba(128, 0, 128, 0.2)",
                        color: "purple",
                    }} />,

            };
            break;
        default:
            break;
    }

    

    return (
        <>
        {/* <div onClick={()=>postImg()}>Button</div>
        <input type="file"  onChange={(e) => setFile(e.target.files[0])}/> */}
         <div className="widget">
            <div className="left">
                <span className="title">TOTAL ORDERS</span>
                <span className="counter">
                   {orders}
                </span>
                <span className="link">View all orders</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* {diff} % */}
                </div>
                <ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }} />
            </div>
        </div>
        <div className="widget">
            <div className="left">
                <span className="title">COMPLETE ORDERS</span>
                <span className="counter">
                    {complete}
                </span>
                <span className="link">View all orders</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* {diff} % */}
                </div>
                <ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }} />
            </div>
        </div>
        <div className="widget">
            <div className="left">
                <span className="title">ORDERS INPROCESS</span>
                <span className="counter">
                    {processing}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* {diff} % */}
                </div>
                {data.icon}
            </div>
        </div>
        <div className="widget">
            <div className="left">
                <span className="title">TOTAL SALES</span>
                <span className="counter">
                    {sale}
                </span>
                <span className="link">View net sales</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* {diff} % */}
                </div>
                <MonetizationOnOutlinedIcon className="icon"
                    style={{
                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                        color: "green"
                    }} />
            </div>
        </div>
        
        </>
       
        
    );
}

export default Widget