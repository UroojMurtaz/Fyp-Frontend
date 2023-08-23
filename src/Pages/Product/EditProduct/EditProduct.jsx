import "./editProduct.scss";
import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
import MetaData from "../../../components/MetaData/MetaData";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  let { state } = useLocation();

  const {
    id,
    title,
    images,
    ratings,
    description,
    price,
    Skincolor,
    category,
    subCategory,
    brand,
    Stock,
    SKU,
    status,
    offerPrice,
    ActualPrice,
  } = state ?? "";

  const [margin, setMargin] = useState("_");
  const [profit, setProfit] = useState("_");
  const [name, setName] = useState(title)
  const [desc, setDesc] = useState(description);
  const [pri, setPrice] = useState(price);
  const [Offerpri, setOfferprice] = useState(offerPrice);
  const [actualpri, setActualprice] = useState(ActualPrice);

  const [cat, setCat] = useState(category);
  const [subCat, setSubcat] = useState(subCategory);
  const [skin, setSkin] = useState(Skincolor);
  const [vis, setVis] = useState(false);
  const [Brand, setBrand] = useState(brand);
  
  const [sku, setSKU] = useState(SKU);
  const [stock, setStock] = useState(Stock);
 

  const [variant, setVariant] = useState([{ title: "", options: "" }]);



  // let ids = variant.map( (item) => item.title);

  const myFunction = () => {
    var checkBox = document.getElementById("Check");
    if (checkBox.checked === true) {
      setVis(true);
    } else {
      setVis(false);
    }
  };

  const addVariants = () => {
    setVariant([...variant, { Title: "", Options: "" }]);
  };

  
  const update = async (id) => {
    const Updatedproduct={
      name:name,
      description:desc,
      price:pri,
      ActualPrice:actualpri,
      offerPrice:Offerpri,
      category:cat,
      subCategory:subCat,
      SKU:sku,
      Stock:stock,
      brand:Brand,
    }
    // const formData = new FormData();
    // console.log({id})
    // formData.append("name", name);
    await axios.put(`http://localhost:5000/api/product/${id}`, Updatedproduct)
    .then((res)=>console.log(res))
    alert("Updated Successfully")
  };

  return (
    <div className="new">
      <MetaData title="Edit Product" />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="main">
          <div className="top">
            <h1>Edit Product</h1>
            <div>
              <div className="ui button" onClick={()=>update(id)}>
                Update Save
              </div>
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
                      value={name}
                      placeholder="Enter Title"
                      autoCapitalize="words"
                      onChange={e=>setName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h4 className="ui header">Description</h4>
                    <textarea
                      rows="5"
                      value={desc}
                      placeholder="Enter description"
                      onChange={e=>setDesc(e.target.value)}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="media">
                <h4 class="ui header">Media</h4>
                <div className="image">
                  <AddAPhotoTwoToneIcon className="icon" />
                  <div className="field">
                    <input type="file" />
                  </div>
                </div>
              </div>
              <div className="pricing">
                <form className="ui form">
                  <h4 className="ui header">Pricing</h4>
                  <div className="two fields">
                    <div className="field">
                      <label>Price</label>
                      <input
                        type="number"
                        value={pri}
                        placeholder="Enter price"
                        onChange={e=>setPrice(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Compare at Price</label>
                      <input
                        type="number"
                        value={Offerpri}
                        placeholder="Enter price"
                        onChange={e=>setOfferprice(e.target.value)}
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
                          value={actualpri}
                          placeholder="Enter price"
                          onChange={e=>setActualprice(e.target.value)}
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
                  <input type="checkbox" name="example" />
                  <label>Charge tax on this product</label>
                </div>
              </div>

              <div className="category">
                <h4 class="ui header">Category</h4>
                <form className="ui form">
                  <div className="select">
                    <select
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                    >
                      <option>Select...</option>
                      <option>Makeup</option>
                      <option> Skin Care </option>
                      <option> Body and Bath </option>
                    </select>
                  </div>
                </form>
                <h4 className="ui  header">SubCategory</h4>
                <form className="ui form">
                  <div className="select">
                    <select
                      value={subCat}
                      onChange={(e) => setSubcat(e.target.value)}
                    >
                      <option>Select...</option>
                      <option>Lipstick</option>
                      <option>LipGloss</option>
                    </select>
                  </div>
                </form>
                <h4 className="ui  header">Skin Color</h4>
                <form className="ui form">
                  <div className="select">
                    <select
                      value={skin}
                      onChange={(e) => setSkin(e.target.value)}
                    >
                      <option>Select...</option>
                      <option>Dark</option>
                      <option>Light</option>
                      <option>Medium</option>
                    </select>
                  </div>
                </form>
              </div>

              <div className="inventory">
                <h4 className="ui header">Inventory</h4>
                <form className="ui form">
                  {/* <label>Inventory Managed by</label>
                  <div className="select">
                    <select >
                      <option>Select...</option>
                      <option>Dark</option>
                      <option>Light</option>
                      <option>Medium</option>
                    </select>
                  </div> */}
                  <div className="twofields">
                    {/* <div className="field">
                      <span>Add Quantity</span>
                      <input type="number" placeholder='Enter Title' />
                    </div> */}
                    <div className="two fields">
                      <div className="field">
                        <span>Add Quantity</span>
                        <input
                          type="text"
                          placeholder="Enter Stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <span>SKU (Stock Keeping Unit)</span>
                        <input
                          type="text"
                          placeholder="Enter Stock Keeping Unit"
                          value={sku}
                          onChange={(e) => setSKU(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    id="myCheck"
                    onClick={() => myFunction()}
                  />
                  <label>Track Product</label>
                </div>
                {vis && <div></div>}
              </div>

              {/* <div className="shipping">Shipping</div> */}
              <div className="variants">
                <h4 className="ui header">Variants</h4>

                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    id="Check"
                    onClick={() => myFunction()}
                  />
                  <label>
                    This product has multiple options, like different sizes or
                    colors
                  </label>
                </div>
                {vis && (
                  <div>
                    <label></label>
                    <hr className="ui dividing header" />
                    <h4>Options</h4>

                    <form className="ui form">
                      {variant.map((variants, index) => (
                        <div key={index}>
                          <h5>Option {index + 1}</h5>
                          <div className=" fields">
                            <div className="four wide field">
                              <input
                                type="text"
                                placeholder="Title"
                                value={variants.title}
                              />
                            </div>
                            <div className="ten wide field">
                              <input
                                type="text"
                                placeholder="Enter attributes"
                                value={variants.options}
                              />
                            </div>
                          </div>
                          <hr className="ui dividing header" />
                          <br />
                        </div>
                      ))}
                    </form>
                    <div className="ui button">Submit</div>

                    <div className="ui button" onClick={() => addVariants()}>
                      Add Another Option
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="productStatus">
                <div className="productStatus">
                  <form class="ui form">
                    <div className="field">
                      <h4 className="ui header">Brand</h4>
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={Brand}
                        onChange={(e) => setBrand(e.target.value)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
