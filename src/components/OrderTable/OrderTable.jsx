import "./orderTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function ProductTable() {
  const [pageSize, setPageSize] = useState(9);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [refresh, setRefresh] = useState();
  let [loading, setLoading] = useState(true);

  var ShopOwner_id = localStorage.getItem("User");
  ShopOwner_id = JSON.parse(ShopOwner_id);

  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.user);

  // console.log("token",user.token)

  const fetchData = async (id) => {
   
    const { data } = await axios.get(`http://localhost:5000/api/order/shopKeeperOrders/${ShopOwner_id._id}`);
    if (data.success === true) {
      console.log(data.orders)
      setProducts(data.orders);
      setLoading(false)
    } else {
      console.log(data.message);
    }
  };

 

  useEffect(() => {
    fetchData(ShopOwner_id);
  }, [refresh]);

  // console.log("orders",products)
  

  const productRows = products.map((order) => {
    return {
      id: order._id,
      title: order.product.name,
      img:`${order.product.images[0].imageUrl}`,
      customer: order.userOrderedPlaced.name,
      amount: order.totalPrice,
      status: order.orderStatus,
      address:order.shippingInfo.address,
      city:order.shippingInfo.city,
      country:order.shippingInfo.country,
      phone:order.shippingInfo.phoneNo,
      pinCode:order.shippingInfo.pinCode,
      state:order.shippingInfo.state,
      price:order.product.price,
      subCategory:order.product.subCategory,
      quantity:order.quantity,
      shippingPrice:order.shippingPrice,
      trackigID:order.trackigID,
      adminStatus:order.AdminStatus

    };
  });

  const productColumns = [
    { field: 'trackigID', headerName: 'Tracking ID', width: 130 },
    {
      field: "title",
      headerName: "Product",
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
      field: "customer",
      headerName: "Customer",
      width: 140,
    },
    {
      field: "price",
      headerName: "Amount",
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
    {
      field: "adminstatus",
      headerName: "Admin Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.adminstatus}`}>
            {params.row.adminStatus}
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
            {/* <Link to='/products/productid' > */}
            <VisibilityOutlinedIcon
              className="icon"
              onClick={() => navigate('/orders/orderid',{
                state:{
                  id:params.row.id,
                  title:params.row.title,
                  amount:params.row.amount,
                  address:params.row.address,
                  city:params.row.city,
                  country:params.row.country,
                  phone:params.row.phone,
                  customer: params.row.customer,
                  pinCode:params.row.pinCode,
                  State:params.row.state,
                  img:params.row.img,
                  price:params.row.price,
                  subCategory:params.row.subCategory,
                  quantity:params.row.quantity,
                  shippingPrice:params.row.shippingPrice,
                  trackigID:params.row.trackigID,


                },
              })}
            />
            {/* </Link> */}
            {/* <Link to="/products/edit/productid"> */}
            <CreateOutlinedIcon
              className="icon"
              // onClick={() => fetchProductEdit(params.row.id)}
            />
            {/* </Link> */}

            <DeleteOutlineOutlinedIcon
              // onClick={() => deleteProduct(params.row.id)}
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
      <DataGrid
        style={{ height: 580, width: "100%" }}
        className="datagrid"
        rows={productRows}
        columns={productColumns.concat(actionColumn)}
        pageSize={pageSize}
        rowsPerPageOptions={[9, 25, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        loading={loading}
      />
    </div>
    
    </>
    
    
  );
}

export default ProductTable;
