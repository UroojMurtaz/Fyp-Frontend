import { useState } from "react";
import "./resetPassword.scss";
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";


function ResetPassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPass] = useState();
  var token=localStorage.getItem("ResetToken")
  console.log("Token",token)
  const navigate = useNavigate();
  const ResetPassword = async (token) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/user/resetPassword/${token}`, {
        password,
        confirmPassword,
      });

      console.log("data",data);
      if (data.success === true) {
        toast.success("Password Updated Successfully");
        navigate("/");
        
      }
    } catch (error) {
     console.log(error);
    }
  };
  return (
    <div className="reset_password_main">
      <div className="sub-main">
        <div >
          <div>
            <div className="ui dividing header">Update Profile</div>
            <div className="form">
            <div class="ui left icon input">
              <input type="password" placeholder="New password" onChange={e=>setPassword(e.target.value)}/>
              <i class="lock icon"></i>
            </div>
            </div>
            <div className="form">
            <div class="ui left icon input">
              <input type="text" placeholder="Confirm password" onChange={e=>setConfirmPass(e.target.value)} />
              <i class="lock open icon"></i>
            </div>
            </div>
          </div>
          <div className="button">
          <div className="ui button" onClick={()=>ResetPassword(token)}>Update</div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
