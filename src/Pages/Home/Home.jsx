import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import MetaData from "../../components/MetaData/MetaData";
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeginPage from "./BeginPage"

function Home() {
  const navigate=useNavigate()
  const [store, setStore] = useState();
  var Shop=localStorage.getItem("Shop")
  console.log(Shop)
  Shop=JSON.parse(Shop)
  // console.log(Shop)
  useEffect(() => {
    console.log("step1")
    console.log("Shop",Shop)
    console.log("step2")
      if (Shop === "Deactivated") {
        console.log("step3")
        // alert("Hello")
        console.log("step4")
        setStore(false)
      }
       else {
        console.log("step5")
        setStore(true)
        console.log("step6")
        // alert("Urooj")
      }
  
  }, []);
  const Logout=()=>{
    localStorage.clear()
    toast.success("Logout Successfully",{
        position:"top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        // pauseOnHover:true,

      })
    navigate('/')

}

  return (
    <>
      {!store ?  (
        // <div className="newStore">
        //   <div>
        //   <div>Welcome to Bare Beauty Store</div>
        //   <div>Lets Configure your store</div>
        //   <div className="ui button" onClick={()=>navigate('/setShop')}>Begin</div>
        //   </div>
        //   <div className="ui button" onClick={()=>Logout()}>Logout</div>
          
        // </div>
        <BeginPage/>
      ) : (
        <div className="home">
          <MetaData title="BareBeauty" />
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
            </div>
            <div className="charts">
              <Featured />
              <Chart title="Last 6 Months (Revenue)" aspect={2.3 / 1} />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
