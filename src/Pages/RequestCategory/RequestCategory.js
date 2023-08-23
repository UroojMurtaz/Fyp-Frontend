import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./requestCategory.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddCategory() {
  const [requestCategory, setRequestCategory] = useState();
  const [requestSubCategory, setRequestSubCategory] = useState();
  const [description, setDescription] = useState();

  var id = localStorage.getItem("UserId");
  id = JSON.parse(id);
  console.log(id);

  const Add = async () => {
    if (description == null) {
      toast.error("Please write the descriptionalong with request");
    } else {
      const formData={
        RequestBy: id,
        RequestCategory: requestCategory,
        RequestSubCategory: requestSubCategory,
        Description: description
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/request/add",
        formData
      );
      setRequestCategory("hello")
      if (data.success === true) {
       
        toast.success("Request Sent Successfully");
      } else {
        toast.error(data.message);
      }
      console.log("data", data);
    }
  };
  return (
    <div className="Category">
      <Sidebar />
      <div className="categoryContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          Add Request
        </h2>
        
        <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <div className="AddCategory-Back-Button">
           <KeyboardBackspaceIcon className="AddCategory-icon" />

           <span>Back</span>
         </div> */}
        
          <button
            className="ui button"
            style={{
              color: "white",
              backgroundColor: "#7451f8",
              marginLeft: "15px",
            }}
            onClick={() => Add()}
          >
            Send Request
          </button>
        </div>
        <div className="main">
          <h3 className="ui dividing header" style={{ color: "#56606E" }}>
            Add New Category Request
          </h3>
          <div className="ui form">
            <div className="field">
              <h4 className="ui header">Request Category</h4>
              <input
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setRequestCategory(e.target.value)}
              />
            </div>
            <div className="field">
              <h4 className="ui header">Request Subcategory</h4>
              <input type="text" placeholder="Enter Title" onChange={(e) => setRequestSubCategory(e.target.value)}/>
            </div>
            <div className="field">
              <h4 className="ui header">Description</h4>
              <textarea
                rows="5"
                placeholder="Enter description"
                 onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
