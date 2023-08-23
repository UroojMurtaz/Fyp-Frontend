import React,{useContext} from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ForumIcon from '@mui/icons-material/Forum';
import {Link,useNavigate} from "react-router-dom"
import { DarkModeContext } from '../../context/darkModeContext';
import CategoryIcon from '@mui/icons-material/Category';
import axios from "axios"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sidebar() {
    const {dispatch}=useContext(DarkModeContext)
    const navigate=useNavigate()
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
        <div className='sidebar'>
            <div className="top">
                <Link to="/ShopOwner">
                <span className='logo'>BareBeauty</span>
                </Link>            
            </div>
            <hr />
            <div className="center">
                <ul>
                <p className='title'>MAIN</p>
                <Link to="/ShopOwner">
                <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                </Link>
                    <p className='title'>LISTS</p>
                    <Link to='/products'>
                    <li>
                        <StoreIcon className="icon" />
                        <span>Products</span>
                    </li>
                    </Link>
                    <Link to='/orders'>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders</span>
                    </li>
                    </Link>
                    <Link to="/requestcategory">
                    <li>
                        <CategoryIcon className="icon" />
                        <span>Request Category</span>
                    </li>
                    </Link>
                    <Link to="/community">
                    <li>
                        <ForumIcon className="icon" />
                        <span>Community</span>
                    </li>
                    </Link>
                   
                    <p className='title'>USEFUL</p>
                    <Link to='/reports'>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    </Link>
                    
                    <Link to="/notifications">
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    </Link>
                    <p className='title'>USER</p>
                    <Link to='/users/profile'>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                    </Link>
                   
                    <li>
                        <ExitToAppIcon className="icon"/>
                        <span onClick={()=>Logout()}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
               <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
               <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
             


            </div>
        </div>
    )
}
