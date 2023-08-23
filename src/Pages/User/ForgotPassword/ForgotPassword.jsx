import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.scss";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sentEmail = async () => {
    if (email == null) {
      toast.error("Please Enter Email");
    } else {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/user/forgetPassword`,
          {
            email,
          }
        );
        if (data.success === true) {
          console.log(data)
          localStorage.setItem("ResetToken",data.user.resetPasswordToken)
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="forgot_password_main">
      <div className="forgot_password_sub-main">
        <div>
          <div>
            <div className="ui dividing header">Forgot Password</div>
            <div className="form">
              <div class="ui left icon input">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i class="mail icon"></i>
              </div>
            </div>
          </div>
          <div className="button">
            <div className="ui button" onClick={() => sentEmail()}>
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
