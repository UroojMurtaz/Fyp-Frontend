import { useState, useRef, useEffect } from "react";
import "./postVideo.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tab from "../../components/CommunityTab/CommunityTab";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader
 from "react-spinners/ClipLoader";

function Reports() {
  let [loading, setLoading] = useState(false);

  const [Category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [Description, setDecs] = useState();
  const [cat, setCat] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  var shopOwnerid = localStorage.getItem("UserId");
  shopOwnerid = JSON.parse(shopOwnerid);
  const [refresh, setRefresh] = useState();
  const navigate = useNavigate();

  const Add = async () => {
    if (
      file == null ||
      image == null 
      ||
      title == null ||
      Description == null ||
      Category == null
    ) {
      toast.error("Please add all fields");
    } else {
      setLoading(true)
      const formData = new FormData();
      const arr=[]
      arr.push(image)
      arr.push(file)
      console.log(arr)
      
      // formData.append("files", arr);
      
    for (let i = 0; i < arr.length; i++) {
      formData.append("files", arr[i]);
    }
      formData.append("files", arr);
      formData.append("title",title);
      formData.append("Description",Description);
      formData.append("BrandName",Category);
      formData.append("user",shopOwnerid);
      const { data } = await axios.post(
        "http://localhost:5000/api/video/shopOnwer/postVideo",
        formData
      );
      if (data.success === true) {
        setRefresh(!refresh)
        setLoading(false)
        navigate('/community')
        toast.success("Video Posted Successfully");  
      } else {
        toast.error(data.message);
      }
      console.log("data", data);
    }
  };

  const fetchCategory = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/category/Allcategories`
    );
    if (data.success === true) {
      console.log("data", data.categories);
      // setTotal(data.Count)
      setCat(data.categories);
    } else {
      console.log(data.message);
    }

    // .then(fetchData())
  };

  useEffect(() => {
    fetchCategory();
  }, [refresh]);
  const [src, setSrc] = useState("");
  console.log("iamge",image)
  console.log("video",file)

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      setFile(event.target.files[0])
      const video = event.target.files[0];
      // const arr=[]
      // arr.push(video)
      // arr.push(image)
      

      // Transform file into blob URL
      setSrc(URL.createObjectURL(video));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="AddCategory">
      <Sidebar />
      <div className="AddcategoryContainer">
        <Navbar />
        <div className="top-video">
          <Tab />
        </div>
        <div
          style={{
            color: "#56606E",
            // backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          
          {loading ? 
          <div 
          style={{
          width:" 100%",
          display: "flex",
          justifyContent: "flex-end",
          }}>
            <ClipLoader
        color="#6436d6"
        loading={loading}
        size={50}
      />
            </div>
          : 
          <button
          className="ui button"
          style={{
            color: "white",
            backgroundColor: "#7451f8",
            marginLeft: "15px",
          }}
            onClick={()=>Add()}
        >
          Post
        </button>
        }
        </div>

        <div className="Addcategory-main">
          <div style={{ display: "flex" }}>
            <div className="stepper-image-post">
              <h4 style={{ color: "lightgray", margin: "10px" }}>
                Upload Cover Photo
              </h4>
              <div className="stepper-image-left">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="steeper-image-right">
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="stepper-Video-post">
              <h4 style={{ color: "lightgray", margin: "10px" }}>
                Upload Video
              </h4>

              <video
                controls
                autoPlay
                src={src}
                width="620"
                height="250"
                marginLeft="20%"
              >
                Sorry, your browser doesn't support embedded videos, but don't
                worry, you can
                <a href="https://archive.org/details/BigBuckBunny_124">
                  download it
                </a>
                and watch it with your favorite video player!
              </video>
              <input type="file" onChange={handleChange} />
            </div>
          </div>
          <br/>

          <form className="ui forms">
            <div class="ui form">
              <div class="fields">
                <div class="inline required field">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    onChange={(e) =>setTitle(e.target.value)}
                    style={{ width: "25rem" }}
                  />
                </div>
                <div class="inline required field">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    onChange={(e) =>setCategory(e.target.value)}
                    style={{ width: "25rem" }}
                  />
                </div>
                {/* <div class="inline required field">
                  <label>Select Category</label>
                  <select
                    class="ui fluid dropdown"
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "25rem", marginLeft: "14.5px" }}
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>

                    {cat &&
                      cat.map((e) => (
                        <option value={e._id}>{e.categoryName}</option>
                      ))}
                  </select>
                </div> */}
              </div>
              <div class="field" style={{width:"82.5%"}}>
    <label>Description</label>
    <textarea rows="2" onChange={(e) => setDecs(e.target.value)}></textarea>
  </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reports;
