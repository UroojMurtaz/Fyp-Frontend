import {useState} from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./profile.scss";
import { Link } from "react-router-dom";
function Profile() {
  var user=localStorage.getItem("User")
  user = JSON.parse(user);

  var photo=localStorage.getItem("photo")
 photo = JSON.parse(photo);
  
  return (
    <div className="profile_container">
      <Sidebar />
      <div className="profile_new_container">
        <Navbar />
        <div className="profileContainer">
          <div className="right">
            <div className="heading">
              <h1>My Profile</h1>
            </div>

            <div className="image">
              <img src={photo} alt="" />
            </div>
            <Link to='/users/me/editProfile'>
            <div className="button">
              <div className="ui button">Edit Profile</div>
            </div>
            </Link>
            
          </div>
          <div></div>
          <div className="left">
            <div className="name">
              <h4>Full Name</h4>
            </div>
            <div className="name">
              <p>{user.FullName}</p>
            </div>
            <div className="email">
              <h4>Email</h4>
            </div>
            <div className="email">
              <p>{user.email}</p>
            </div>
            <div className="joined">
              <h4>Joined On</h4>
              <p></p>
            </div>
            <div className="orderBtn">
              <Link to="/orders">
                <div className="ui button">My Orders</div>
              </Link>
            </div>
            <div className="changeBtn">
              <Link to="/users/me/update">
                <div className="ui button">Change Password</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
