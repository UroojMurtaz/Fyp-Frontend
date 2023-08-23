import {useState} from "react"
import "./orderDetail.scss";
import Navbar from '../../../components/Navbar/Navbar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderDetail() {
  var user=localStorage.getItem("User")
  user=JSON.parse(user)
  const navigate=useNavigate()

  const [status,setStatus]=useState("Cancelled")
  const [Com,setCom]=useState("Completed")

  let { state } = useLocation();
  const{
    id,
    title,
    amount,
    address,
    country,
    city,
    phone,
    customer,
    pinCode,
    State,
    subCategory,
    quantity,
    price,
    img,
    shippingPrice


  }=state??""

  console.log(title)

  const update = async (id) => {
    const Updatedproduct={
      orderStatus:status,
    }
    // const formData = new FormData();
    // console.log({id})
    // formData.append("name", name);
    await axios.put(`http://localhost:5000/api/order/changeStatus/${id}`, Updatedproduct)
    .then((res)=>console.log(res.data))
    toast.success("Order Cancelled Successfully")
    navigate('/orders')
  };

  const updateComplete = async (id) => {
    const Updatedproduct={
      orderStatus:Com,
    }
    await axios.put(`http://localhost:5000/api/order/changeStatus/${id}`, Updatedproduct)
    .then((res)=>console.log(res.data))
    toast.success("Order Status Updated Successfully")
    navigate('/orders')
  };

  return (
    <div className="detail">
      <Sidebar />
      <div className="ordercontainer">
        <Navbar />
        <div className="main">
          <div className="bottom">
            <div className="left">
              <h1>Order Number #54737</h1>
              <div className="itemsSummary">
                <table class="ui celled table">
                  <thead>
                    <tr>
                      <th>
                        <h4>Items Summary</h4>
                      </th>
                      <th>QTY</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h4 class="ui image header">
                          <img
                            src={img}
                            alt=""
                            class="ui  rounded image"
                          />
                          <div class="content">
                            hello{title}
                            <div class="sub header">{subCategory}</div>
                          </div>
                        </h4>
                      </td>
                      <td>x{quantity}</td>
                      <td>Rs:{price}</td>
                      <td>Rs:{quantity*price}</td>
                    </tr>
                    {/* <tr>
                      <td>
                        <h4 class="ui image header">
                          <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            class="ui rounded image"
                          />
                          <div class="content">
                            Matthew
                            <div class="sub header">Fabric Design</div>
                          </div>
                        </h4>
                      </td>

                      <td>x1</td>
                      <td>Rs:2000</td>
                      <td>Rs:2000</td>
                    </tr>
                    <tr>
                      <td>
                        <h4 class="ui image header">
                          <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            class="ui rounded image"
                          />
                          <div class="content">
                            Lindsay
                            <div class="sub header">Entertainment</div>
                          </div>
                        </h4>
                      </td>
                      <td>x1</td>
                      <td>Rs:2000</td>
                      <td>Rs:2000</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>

              <div className="orderdetail">
                <div className="ui dividing header">
                  Customer and Order Details
                </div>
                <table class="ui table">
                  <tbody>
                    <tr>
                      <td>Customer Name</td>
                      <td class="right aligned">{customer}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td class="right aligned">{phone}</td>
                    </tr>
                    <tr>
                      <td>Delivery Method</td>
                      <td class="right aligned">Cash on Delivery</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ui right floated negative button"  onClick={()=>update(id)}>
                  Cancel Order
                </div>
                <div
                  style={{ marginLeft: "24rem" }}
                  className="ui positive button"
                  onClick={()=>updateComplete(id)}
                >
                  Complete Order
                </div>
              </div>
            </div>

            <div className="right">
              <div className="customer">
                <h3>Shop Owner Details</h3>
                <div className="cellWrapper">
                  <img
                    src={user.profilePhoto.imageUrl}
                    alt=""
                    className="image"
                  />
                  <span>{user.FullName}</span>
                </div>
              </div>

              <div className="orderSummary">
                <h3>Order Summary</h3>
                <div className="bottom">
                  <div className="left">
                    <span>Order Created</span>
                    <span>Order Time</span>
                    <span>SubTotal</span>
                    <span>Delivery </span>
                  </div>
                  <div className="right">
                    <span>May 17,2021</span>
                    <span>06:24 pm</span>
                    <span>Rs:{quantity*price}</span>
                    <span>Rs:{shippingPrice}</span>
                  </div>
                </div>
              </div>
              <div className="total">
                <span style={{ fontSize: "14px", fontWeight: 600 }}>Total</span>
                <span style={{ float: "right" }}>Rs: {amount}</span>
              </div>
              <div className="address">
                <h3>Delivery Address</h3>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                  Street Address :{" "}
                  </span>
                  <span>{address}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    City :{" "}
                  </span>
                  <span>{city}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Province :{" "}
                  </span>
                  <span>{State}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Country/Region :{" "}
                  </span>
                  <span>{country}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Postalcode :{" "}
                  </span>
                  <span>{pinCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
