import { useState,useEffect } from "react";
import "./ProductList.scss";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Productlist from "../../../components/ProductTable/ProductTable";
import NotFound from "../../PageNotFound/NotFound";

function ProductList() {
  var user = localStorage.getItem("User");
  user = JSON.parse(user);
  const [role, setRole] = useState(true);
  useEffect(()=>{
    if (user.role == "admin") {
    setRole(false);
  }
  })
  return (
    <>
      {role ? (
        <div className="product">
          <Sidebar />
          <div className="productContainer">
            <Navbar />
            <Productlist />
          </div>
        </div>
      ) : (
        <NotFound/>
      )}
    </>
  );
 
}

export default ProductList;
