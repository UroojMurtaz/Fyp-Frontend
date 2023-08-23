import React from 'react'
import "./beginPage.scss"
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BeginPage() {
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
    <div className="main-begin">
        <div className="top-begin">
        <div className="begin-main-left">
        <div className="begin-main-logo">
            <h2>Bare Beauty Seller Center</h2>
          </div>
        </div>
        <div className="begin-main-right">
       <div className='ui right floated button' onClick={()=>Logout()}>Logout</div>
        </div>
        </div>
        <div className="bottom-begin">
            <div className="left-bottom-begin">
                <img src="https://i.pinimg.com/736x/5d/66/d2/5d66d2a48f7b07ce84c3e5904ec68e51.jpg"/>
            </div>
            <div className="right-bottom-begin">
            <p className="auth-heading">Welcome To Bare Beauty Seller Account</p>
          {/* <p className="auth-heading">#1 Marketplace</p> */}
          <div>
            <p className="auth-exp">
            Lets Configure your Store and selling your Products!
            </p>
          </div>
          <br/>
          <div className="ui button" onClick={()=>navigate('/setShop')}>Let's Begin</div>
            </div>

        </div>
        

        
    </div>
  )
}

export default BeginPage