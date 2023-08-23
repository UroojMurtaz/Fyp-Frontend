import "./New.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
import MetaData from "../../../components/MetaData/MetaData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SquareIcon from "@mui/icons-material/Square";
import { ToastContainer, toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import "react-toastify/dist/ReactToastify.css";
import ClipLoader
 from "react-spinners/ClipLoader";
import Modal from 'react-modal';
import p1 from "../../../images/Picture3.png"
import p2 from "../../../images/Picture5.png"
import p3 from "../../../images/p1.png"
import p4 from "../../../images/Picture6.png"
import p5 from "../../../images/Picture7.png"
import p6 from "../../../images/Picture8.png"


function New() {
  const [margin, setMargin] = useState("_");
  const [profit, setProfit] = useState("_");
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [disPrice, setDisPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [subCat, setSubcat] = useState();
  const [skin, setSkin] = useState([]);
  const [image, setImage] = useState();
  const [stock, setStock] = useState();
  const [sku, setSKU] = useState();
  const [vis, setVis] = useState(false);

  const [variant, setVariant] = useState([{ title: "", options: "" }]);
  const [cat, setCat] = useState();
  const [subcat, setsubcat] = useState();
  const [sname, setSname] = useState("");
  const [scolor, setScolor] = useState("");
  const navigate = useNavigate();
  const [shade, setShade] = useState([]);
  let [loading, setLoading] = useState(false);

  const [modalAnswer, setIsAnswer] = useState(false);

  const Styles = {
    content: {
      top: '10%',
      left: '25%',
      width:"50rem",
      height:"30rem",
      marginRight: '-50%',
      borderRadius:"10px",
      backgroundColor:"#E7E2EF"
      
    },
  };

  function closeModal() {
    setIsAnswer(false);
  }

  var id = localStorage.getItem("UserId");
  id = JSON.parse(id);
  console.log(id);
var count=0
  const myFunction = () => {
    var checkBox = document.getElementById("Check");
    if (checkBox.checked === true && skin.length != 0) {
      setVis(true);
    } else if (checkBox.checked === true && skin.length == 0) {
      toast.warning("Please first select the skin color", {
        position: "bottom-left",
        closeOnClick: true,
      });
    } else {
      setVis(false);
    }
  };

  const addVariants = () => {
    setVariant([...variant, { Title: "", Options: "" }]);
    console.log();
  };

  const MulitpleFileChange = (e) => {
    // setImage(e.target.files)
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
    setImage(e.target.files);
  };
  if (image) {
    console.log("hello", image);
  }

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
  const fetchSubCategory = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/subcategory/Allsubcategories`
    );
    if (data.success === true) {
      console.log("data", data);
      // setTotal(data.Count)
      setsubcat(data.Subcategories);
    } else {
      console.log(data.message);
    }

    // .then(fetchData())
  };
  // console.log("iamges",image)
  const UploadMultipleFiles = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("offerPrice", disPrice);
    formData.append("ActualPrice", actualPrice);
    formData.append("category", category);
    formData.append("subCategory", subCat);
    formData.append("Skincolor", skin);
    formData.append("Stock", stock);
    formData.append("SKU", sku);
    formData.append("brand", brand);

    formData.append("user", id);
    console.log(formData);

    let arr = [];

    for (let i = 0; i < image.length; i++) {
      formData.append("files", image[i]);
    }
    // for (let i = 0; i < shade.length; i++) {
    //   arr.push(shade[i])
    //   // formData.append("shade", shade[i]);
    // }
    // console.log("arr",arr)
    formData.append("shade", JSON.stringify(shade));

    const { data } = await axios.post(
      "http://localhost:5000/api/product/new",
      formData
    );
    if (data.success === true) {
      setLoading(false)
      toast.success("Product added Successfully");
      navigate("/products");
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    const c = e.target.checked;
    console.log(v, c);
    if (c) {
      setSkin([...skin, v]);
    } else {
      setSkin(skin.filter((e) => e !== v));
    }
  };

  const deleteShade=(v)=>{
    console.log(v)
    setShade(shade.filter((e) => e._id !== v));
  }

  const addShade = () => {
    console.log(shade);
    console.log(sname);
    // const a=toRGBArray(scolor)
    console.log(scolor);
    // const a=scolor.match(/\d+/g).map(Number);
    // console.log(Array.isArray(a))
    const a=Math.floor(Math.random() * 100);
    console.log(a)

    let nObj = { _id:a, name: sname, shade: scolor, quantity: stock};
    let arr = shade.concat(nObj);
    console.log(shade);
    setShade(arr);
    console.log(shade);
  };

  return (
    <div className="new">
      <MetaData title="Add Product" />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="main">
          <div className="top">
            <h1 className="ui dividing header">Add Product</h1>
            <div 
              style={{
                color: "#56606E",
                backgroundColor: "#F5F5F5",
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
          : <button
          className="ui button"
          style={{
            color: "white",
            backgroundColor: "#7451f8",
            marginLeft: "15px",
          }}
          onClick={() => UploadMultipleFiles()}
        >
          Add
        </button> }
             
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="title">
                <form class="ui form">
                  <div className="field">
                    <h4 className="ui header">Title</h4>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h4 className="ui header">Description</h4>
                    <textarea
                      rows="5"
                      placeholder="Enter description"
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="media">
                <h4 class="ui header">Media</h4>
                <div className="image">
                  <AddAPhotoTwoToneIcon className="icon" />
                  <div className="field">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => MulitpleFileChange(e)}
                    />
                  </div>
                </div>
                {
                  <div className="images">
                    {selectedImages &&
                      selectedImages.map((image, index) => {
                        return (
                          <div key={image} className="image">
                            <img src={image} height="200" alt="upload" />
                          </div>
                        );
                      })}
                  </div>
                }
              </div>

              <div className="pricing">
                <form className="ui form">
                  <h4 className="ui header">Pricing</h4>
                  <div className="two fields">
                    <div className="field">
                      <label>Price</label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    {/* <div>{price}</div> */}
                    <div className="field">
                      <label>Compare at Price</label>
                      <input
                        type="number"
                        placeholder="Enter Discounted price"
                        onChange={(e) => setDisPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
                <hr className="ui dividing header" />
                <div className="actualprice">
                  <form className="ui form">
                    <div className="three fields">
                      <div className="field">
                        <label>Price</label>
                        <input
                          type="number"
                          placeholder="Enter Actual price"
                          onChange={(e) => setActualPrice(e.target.value)}
                        />
                        <span
                          style={{
                            color: "gray",
                            marginLeft: "0.5rem",
                            fontSize: "12px",
                          }}
                        >
                          Customer wont see this
                        </span>
                      </div>
                      <div className="field">
                        <label>Margin</label>
                        <span>{margin}</span>
                      </div>
                      <div className="field">
                        <label>Profit</label>
                        <span>{profit}</span>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="example"
                    onClick={() => setPrice(price * (17 / 100))}
                  />
                  <label>Charge tax on this product</label>
                </div>
              </div>

              <div className="category">
                <h4 class="ui header">Category</h4>
                <form className="ui form">
                  <div className="select">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option disabled selected>
                        Select...
                      </option>
                      {cat &&
                        cat.map((e) => (
                          <option value={e._id}>{e.categoryName}</option>
                        ))}
                    </select>
                  </div>
                </form>
                <h4 className="ui header">SubCategory</h4>
                <form className="ui form">
                  <div className="select">
                    <select
                      value={subCat}
                      onChange={(e) => setSubcat(e.target.value)}
                    >
                      <option>Select...</option>
                      {subcat &&
                        subcat.map((e) => (
                          <option value={e._id}>{e.subcategoryName}</option>
                        ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="category">
                <h4 class="ui header">Skin Tone</h4>
                <div>
                  <div class="ui checkbox">
                    <input
                      type="checkbox"
                      name="example"
                      value="  Light"
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ marginRight: "20px" }}>Light</label>
                  </div>
                  <div class="ui checkbox">
                    <input
                      type="checkbox"
                      name="example"
                      value="  Medium"
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ marginRight: "20px" }}>Medium</label>
                  </div>
                  <div class="ui checkbox">
                    <input
                      type="checkbox"
                      name="example"
                      value="  Tan"
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ marginRight: "20px" }}>Tan</label>
                  </div>
                  <div class="ui checkbox">
                    <input
                      type="checkbox"
                      name="example"
                      value="  Dark"
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ marginRight: "20px" }}>Dark</label>
                  </div>
                  <div class="ui checkbox">
                    <input
                      type="checkbox"
                      name="example"
                      value="  All Skin Type"
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ marginRight: "20px" }}>All Skin</label>
                  </div>
                </div>
                <div style={{marginLeft:"97%"}}>
                  <HelpCenterIcon onClick={() => setIsAnswer(true)}/>
                </div>
                <div>
                    <Modal
                      isOpen={modalAnswer}
                      // onRequestClose={closeModal}
                      style={Styles}
                      // className="customStyles"
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                      <div style={{display:"flex"}}>
                      <h3 style={{flex:"8",color:"#626262"}}>Add Question</h3>
                     <button className="ui button" style={{backgroundColor:"#8266B5",color:"white"}} onClick={()=>closeModal()}>Close</button>
                      </div>
        
                    
                  <h3 className="ui dividing header">Lip Color</h3>
                  <img src={p2}/>
                  <br/>
                  <img src={p1}/>

                  <h3 className="ui dividing header">Blush</h3>
                  <img src={p3}/>
                  <br/>
                  <img src={p4}/>

                  <h3 className="ui dividing header">Light Skin Tone</h3>
                  <img src={p6}/>
                  <h3 className="ui dividing header">Medium Skin Tone</h3>
                  <img src={p5}/>
                  
                 

                     
                     
                    </Modal>
                  </div>
              </div>
              <div className="variants">
                <h4 className="ui header">Variants</h4>

                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    id="Check"
                    onClick={() => myFunction()}
                  />
                  <label>
                    Add shades of the Product
                  </label>
                </div>
                {vis && (
                  <div>
                    <hr className="ui dividing header" />
                    <h4>Add Product Shades according to {skin} Tone</h4>
                    <div className="ui form">
                      <div>
                        <div className=" fields">
                          <div className="field">
                            <span>Shade Name</span>
                            <input
                              type="text"
                              placeholder="Title"
                              value={sname}
                              onChange={(e) => setSname(e.target.value)}
                            />
                            {/* <h1>{sn}</h1> */}
                          </div>
                          <div className="field">
                            <span>Shade</span>
                            <input
                              type="text"
                              placeholder="Enter attributes"
                              value={scolor}
                              onChange={(e) => setScolor(e.target.value)}
                            />
                          </div>
                          <div className="field">
                            <span>Add Quantity</span>
                            <input
                              type="number"
                              placeholder="Enter Title"
                              onChange={(e) => setStock(e.target.value)}
                            />
                          </div>
                          <div>
                            {/* <div className="ui button" onClick={()=>addShade()}>Add</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
            
                    <br /> <div onClick={() => addShade()}>Add</div>
                    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell className="tableCell">SR.No</TableCell>
         <TableCell className="tableCell">Shade Name</TableCell>
         <TableCell className="tableCell">Shade Color</TableCell>
         <TableCell className="tableCell">Quantity</TableCell>
         <TableCell className="tableCell">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shade.map((row) => (
          <TableRow key={row._id}>
            <TableCell className="tableCell">{count=count+1}</TableCell>
            <TableCell className="tableCell">{row.name}</TableCell>
            <TableCell style={{backgroundColor:row.shade}}>{row.shade}</TableCell>
            <TableCell className="tableCell">{row.quantity}</TableCell>
            <TableCell className="tableCell" onClick={()=>deleteShade(row._id)}>Delete</TableCell>

    
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
                    <div
                      className="ui right floated button"
                      onClick={() => console.log(shade)}
                    >
                      Submit
                    </div>
                    <br />
                    <br />
                    {/* {shade.map((e)=>{
                    <div>{e.name}</div>
                   }) } */}
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="productStatus">
                <form class="ui form">
                  <div className="field">
                    <h4 className="ui header">Brand</h4>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="inventory">
                <h4 className="ui header">Inventory</h4>
                <form className="ui form">
                  <div className="twofields">
                    <div className="two fields">
                      <div className="field">
                        <span>Add Quantity</span>
                        <input
                          type="text"
                          placeholder="Enter Title"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <span>SKU</span>
                        <input
                          type="text"
                          placeholder="Enter Title"
                          onChange={(e) => setSKU(e.target.value)}
                        />
                        {shade.map((e) =>(
                          <div style={{backgroundColor:e.shade}}>{e.name}</div>
                          
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
