import React,{useContext,useState,useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/User/login/Login'
import Register from './Pages/User/Register/Register';
import Home from './Pages/Home/Home'
import AddProduct from './Pages/Product/AddProduct/New'
import SingleProduct from './Pages/Product/ProductDetails/ProductInfo'
import ProductList from './Pages/Product/ProductList/ProductList'
import EditProduct from './Pages/Product/EditProduct/EditProduct';
import OrderList from './Pages/Order/OrderList/OrderList'
import OrderDetail from './Pages/Order/OrderDetail/OrderDetail'
import RequestCategory from './Pages/RequestCategory/RequestCategory'
import './Style/dark.scss'
import { DarkModeContext } from './context/darkModeContext';
import ForgotPassword from './Pages/User/ForgotPassword/ForgotPassword';
import Profile from './Pages/User/Profile/Profile'
import ResetPassword from './Pages/User/ResetPassword/ResetPassword';
import ChangePassword from './Pages/User/ChangePassword/ChangePassword';
import EditProfile from './Pages/User/EditProfile/EditProfile';
import SetShop from './Pages/Shop/setUpShop'
import Report from './Pages/ReportandAnalysis/Reports'
import Sales from './Pages/ReportandAnalysis/Sales'
import Inventory from './Pages/ReportandAnalysis/Inventory';
import Request from './Pages/MyRequest/Request';
import PostQues from "./Pages/Community/community";
import PostVideo from "./Pages/Community/PostVideo"
import axios from "axios"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {darkMode}=useContext(DarkModeContext)
  const [login,setLogin]=useState(true)
  // const token=localStorage.getItem("Token")
  // if(token){
  //   setLogin(true)
  // }else{
  //   setLogin(false)
  // }

  const token = localStorage.getItem("Token");

  // useEffect(()=>{
    axios.interceptors.request.use((request) => {
      request.headers.common.token = localStorage.getItem("Token");
      // console.log("token",localStorage.getItem("Token"))
      return request;
    });
  // })
 
  
  return (
    <>
    {login ? 
     <div className= {darkMode ? "app dark" : "app"}>
     <BrowserRouter>
       <Routes>
         <Route path='/'>
           <Route index element={<Register />} />
           
           <Route path='/ShopOwner' element={<Home />} />
           {/* <Route path='/Register' element={<Register />} /> */}
           <Route path='/setShop' element={<SetShop />} />
           


           {/* <Route path='admin'>
             <Route index element={<AdminHome />} />
             <Route path='us' element={<AdminUsers />} />
             <Route path=':ShopOwnerid' element={<Single />} />
             <Route path='addShopowner' element={<AddShopOwner />}/>
             <Route path='ShopownerList' element={<AllShopOwner />}/>
           </Route> */}

           <Route path='users'>
             {/* <Route index element={<List />} /> */}
             <Route path='password/forgot' element={<ForgotPassword/>} />
             <Route path='profile' element={<Profile/>} />
             <Route path='password/reset/:token' element={<ResetPassword/>} />
             <Route path='me/update' element={<ChangePassword/>} />
             <Route path='me/editProfile' element={<EditProfile/>} />

           </Route>

           <Route path='products'>
             <Route index element={<ProductList />} />
             <Route path=':productid' element={<SingleProduct />} />
             <Route path='edit/productid' element={<EditProduct/>}/>
             <Route path='new' element={<AddProduct />} />
           </Route>

           <Route path='orders'>
             <Route index element={<OrderList />} />
             <Route path=':orderid' element={<OrderDetail />} />
           </Route>

           <Route path='requestcategory'>
             <Route index element={<RequestCategory />} />
           </Route>

           <Route path='reports'>
             <Route index element={<Report />} />
           </Route>
           <Route path='sales'>
             <Route index element={<Sales />} />
           </Route>
           <Route path='inventory'>
             <Route index element={<Inventory />} />
           </Route>
           <Route path='notifications'>
             <Route index element={<Request />} />
           </Route>

           <Route path='community'>
             <Route index element={<PostQues />} />
             <Route path='postVideo' element={<PostVideo />} />
           </Route>

         </Route>
       </Routes>
     </BrowserRouter>
     <ToastContainer 
     />

   </div>
   :
   <h1>Not login</h1>
   }
    </>
   
  );
}

export default App;