import React from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa';


function Login() {
  return (
    <div className='register-main'>
      <div className='login-contain'>
        <div className='left-side'>
          <FaHeart color='#877ABC' size={30}  /> <FaRegHeart />
          <h1>Create an Account</h1>
          <i className="bi bi-google"></i>
          <form className="ui form">
            <div className="field">
              <label style={{ aligntext: "left" }}>Email</label>
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <label style={{ aligntext: "left" }}>Password</label>
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
           
            <div className='field'>
            <label>Confirm Password</label>
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            

            {/* <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden" />
                <div style={{ display: "flex" }}>
                  <label>I agree to the </label>
                  <div style={{ marginLeft: "1rem" }}>
                    <Link to="/terms and conditions" style={{ color: "#150BD4", font: "bold" }}>terms and conditions</Link>
                  </div>
                </div>

              </div>


            </div> */}

            {/* <button  id="sub_butt">Create Account</button> */}
            <div className="button">
          <div className="ui button">Create Account</div>
          </div>

            <div style={{ display: "flex", marginTop: "1rem", textAlign: "left" }}>
              <label>Already Registered?</label>
              <Link to="/Login" style={{ color: "#150BD4", font: "bold",marginLeft: "1rem"  }}>Login to your account</Link>
            </div>
          </form>



        </div>
        <div className='right-side'>
          {/* <img src="https://cdn.pixabay.com/photo/2016/06/15/10/23/girl-1458597_960_720.png" alt="signup"/> */}
        </div>

      </div>


    </div>
  )
}

export default Login