import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./editProfile.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
  var user=localStorage.getItem("User")
  user = JSON.parse(user);
  console.log("user",user)
  // console.log("user",user.name)
  var Name=localStorage.getItem("FullName")
  Name = JSON.parse(Name);
  var photo=localStorage.getItem("photo")
 photo = JSON.parse(photo);
  

  
  const [file, setFile] = useState();
  // const [image, setImg] = useState(user.profilePhoto[0].filePath);
  const [image, setImg] = useState(photo);
  const [name, setName] = useState(user.name);
  const [fullName, setFullName] = useState(user.FullName);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(user.Country);
  const [address, setAddress] = useState(user.Address);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const Update = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("FullName", fullName);
    formData.append("Country", country);
    formData.append("Address", address);
    formData.append("phoneNumber", phoneNumber);
    console.log("File",file)
    formData.append("file", file);
   
    const {data}=await axios.put(`http://localhost:5000/api/me/update/info`,formData)

    console.log(data.user)
    if(data.success===true){
      toast.success("ShopOwner detail updated sucessfully")
      localStorage.setItem("User",JSON.stringify(data.user))
      localStorage.setItem("photo",JSON.stringify(data.user.profilePhoto[0].filePath))
      localStorage.setItem("UserId",JSON.stringify(data.user._id))
      localStorage.setItem("Status",JSON.stringify(data.user.Status))
      // const i=JSON.stringify(file)
      // localStorage.setItem("Picture",i)
    }
    else{
      toast.error(data.message)
    }
  };

  // const Update=async()=>{
  //   // const n=JSON.stringify(name)
  //   // localStorage.setItem("UserName",n)
  //   const {data}=await axios.put(`http://localhost:5000/api/me/update/info`,Udata)
  //   console.log(data)
  // }
  


  

  return (
    <div className="shopowner_container">
      <Sidebar />
      <div className="shopowner_new_container">
        <Navbar />
        <div className="top">
          <h1>Edit Profile</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : photo
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                {/* <label>Password</label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
              </div>
              {/* <div className="formInput">
                <label>Username</label>
                <input type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)} />
              </div> */}
              <div className="formInput">
                <label>Name </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {/* <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div> */}
              <div className="formInput">
                
              </div>
              <button type="button" onClick={()=>Update()}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
