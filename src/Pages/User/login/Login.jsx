import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/userAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../components/Spinner/Spinner";

function Login() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  var user = localStorage.getItem("User");
  user = JSON.parse(user);
  var status = localStorage.getItem("Status");
  status = JSON.parse(status);

  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  console.log("error", message);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (token) {
      if (user.role === "ShopOwner") {
        if (status === "Activated") {
          toast.success("Login Successfully")
          navigate("/ShopOwner");
        } else {
          toast.error("Your Account is Deactivated")
          navigate("/");
          localStorage.clear();
        }
      }
       else {
        navigate("/");
        toast.error("Your Email and password is incorrected!")
        localStorage.clear();
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, token]);

  return (
    <>
      <div className="main-login">
        <div className="login-contain">
          <div className="left-side">
            <FaHeart color="#877ABC" size={30} /> <FaRegHeart />
            <h1>Login</h1>
            <i className="bi bi-google"></i>
            <form className="ui form">
              <div className="field">
                <label style={{ aligntext: "left" }}>Email </label>
                <input
                  type="text"
                  name="first-name"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="field">
                <label>Password</label>
                <input
                  type="text"
                  name="last-name"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? <span className="error">{error}</span> : null}
              <div class="field">
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden" />
                  <div style={{ display: "flex", marginLeft: "2" }}>
                    <label>Remember me</label>
                    <div style={{ marginLeft: "5rem" }}>
                      <Link
                        to="/users/password/forgot"
                        style={{ color: "#150BD4", font: "bold" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button type="button" id="sub_butt" onClick={() => Login()}>
                  Login{" "}
                </button>
                {/* <button type="button" id="sub_butt" >Login as Admin</button> */}
              </div>

              {/* <div style={{ display: "flex", marginTop: "1rem", textAlign: "left" }}>
              <label>Not Registered Yet?</label>
              <Link to="/Register" style={{ color: "#150BD4", font: "bold", }}>Create an Account</Link>
            </div> */}
            </form>
          </div>
          <div className="right-side">
            {/* <img src="https://cdn.pixabay.com/photo/2016/06/15/10/23/girl-1458597_960_720.png" alt="login"/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
