import "./productTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";


function ProductTable() {
  const [pageSize, setPageSize] = useState(9);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [refresh, setRefresh] = useState();
  const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);


  var ShopOwner_id = localStorage.getItem("User");
  ShopOwner_id = JSON.parse(ShopOwner_id);

  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.user);

  // console.log("token",user.token)

  const fetchData = async (id) => {
    // await axios.get("http://localhost:5000/api/products")
    // .then(function(response){
    //     setProducts(response.data.products)
    // })

    const { data } = await axios.get(`http://localhost:5000/api/products/ShopOwner/${ShopOwner_id._id}`);
    setIsLoading(true);
    if (data.success === true) {
      setIsLoading(false)
      setProducts(data.product);
      setLoading(false)
     console.log("products",data.product)
    } else {
      setIsLoading(false)
      console.log(data.message);
    }

    // .then(fetchData())
  };

  const fetchProduct = (id) => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then(function (response) {
        setProduct(response.data.product);
      });
    if (product) {
      navigate("/products/productid", {
        state: {
          title: product.name,
          images: product.images,
          ratings: product.ratings,
          description: product.description,
          price: product.price,
          Skincolor: product.Skincolor,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          Stock: product.Stock,
          SKU: product.SKU,
          status: product.status,
          reviews:product.reviews,
          numOfReviews:product.numOfReviews,
        },
      });
    }
  };

  const fetchProductEdit = (id) => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then(function (response) {
        setProduct(response.data.product);
      });
    if (product) {
      navigate("/products/edit/productid", {
        state: {
          id: product._id,
          title: product.name,
          images: product.images,
          ratings: product.ratings,
          description: product.description,
          price: product.price,
          Skincolor: product.Skincolor,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          Stock: product.Stock,
          SKU: product.SKU,
          status: product.status,
          offerPrice: product.offerPrice,
          ActualPrice: product.ActualPrice,
        },
      });
    }
  };

  useEffect(() => {
    fetchData(ShopOwner_id);
  }, [refresh]);

  // console.log("product",product)

  const deleteProduct = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/api/product/${id}`)
        .then((res) => {
          toast.success(res.data.message)(
            // show(res.data.message)
            setRefresh(!refresh)
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const show=()=>{
  //   products.map((p)=>{
  //     console.log(p.images[0].fileName)
  //   })

  // }

  const productRows = products.map((products) => {
    return {
      id: products._id,
      title: products.name,
      img: `${products.images[0].imageUrl}`,
      Category: products.category.categoryName,
      stock: products.Stock,
      brand: products.brand,
      status: products.status,
    };
  });
  // console.log(productRows)

  const productColumns = [
    // { field: 'id', headerName: 'ID', width: 170 },
    {
      field: "title",
      headerName: "PRODUCTS",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImage">
            <img src={params.row.img} alt="avatar" className="cellImg" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "Category",
      headerName: "CATEGORY",
      width: 160,
    },
    {
      field: "stock",
      headerName: "STOCK",
      width: 100,
    },
    {
      field: "brand",
      headerName: "BRAND",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  //temporary data

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
            <VisibilityOutlinedIcon
              className="icon"
              onClick={() => fetchProduct(params.row.id)}
              // onClick={()=>show()}
            />
           
            <CreateOutlinedIcon
              className="icon"
              onClick={() => fetchProductEdit(params.row.id)}
            />
          

            <DeleteOutlineOutlinedIcon
              onClick={() => deleteProduct(params.row.id)}
              className="icon"
            />
          </div>
        );
      },
    },
  ];



  const [modal, setModal] = useState(false);

  const toggleModal=()=>{
    setModal(!modal)
    alert(modal)
  }
  return (
    <>
    <div className="productTable">
      <div className="top">
            <h1 className="ui dividing header">All Products</h1>
            <div 
              style={{
                color: "#56606E",
                backgroundColor: "#F5F5F5",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/products/new">
              <button
          className="ui button"
          style={{
            color: "white",
            backgroundColor: "#7451f8",
            marginLeft: "15px",
          }}
          // onClick={() => UploadMultipleFiles()}
        >
         Add Product
        </button>
              </Link>
          
             
            </div>
          </div>
      {/* <button onClick={toggleModal}>Open</button> */}
      {isLoading ? <Spinner /> : <DataGrid
        style={{ height: 580, width: "100%" }}
        className="datagrid"
        rows={productRows}
        columns={productColumns.concat(actionColumn)}
        pageSize={pageSize}
        rowsPerPageOptions={[9, 25, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        loading={loading}
        
      /> }
      
    </div>
    
    </>
    
  );
}

export default ProductTable;
