import { useEffect, useState } from "react";
import "./request.scss";
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Notification() {
  const [isActive, setIsActive] = useState(false);
  const [rej, setRej] = useState(false);
  const [request, setRequest] = useState(false);
  const [refresh, setRefresh] = useState();
  const [description, setDescription] = useState();
  const [reply, setreply] = useState(true);
  const [Status, setStatus] = useState("Accept");

  var ShopOwner_id = localStorage.getItem("UserId");
  ShopOwner_id = JSON.parse(ShopOwner_id);

  const getRequests = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/request/getShopOwnerRequests/${id}`);
    if (data.success === true) {
      console.log(data);
      setRequest(data.Requests);
    } else {
      toast.error(data.message);
    }
  };

 
  const Accept = () => {
    setIsActive((current) => !current);
    setStatus("Accepted")
    setRej(false);
  };

  const Reject = () => {
    setRej((current) => !current);
    setStatus("Rejected")
  
    setIsActive(false);
  };

  useEffect(() => {
    getRequests(ShopOwner_id);
  }, [refresh]);
  return (
    <div className="Notification">
      <Sidebar />
      <div className="NotificationContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          My Requests
        </h2>

        {request &&
          request.map((r) => {
            return (
              <>
                <div className="request-container">
                  <div className="notificatio-top">
                    <img
                      src={r.RequestBy.profilePhoto.imageUrl}
                      alt="avatar"
                      className="cellImg"
                    />
                    <span
                      style={{
                        color: "#56606E",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {r.RequestBy.FullName}
                    </span>
                  </div>
                  <div className="notification-between">
                    <p
                      style={{
                        color: "#56606E",
                        fontSize: "13.5px",
                        fontWeight: "400px",
                        
                      }}
                    >
                      {r.Description}
                    </p>
                    {r.Status === "null" ? (
                      <div>
                        <span
                          style={{
                            color: "#56606E",
                            fontSize: "13.3px",
                            fontWeight: "400px",
                          }}
                        >
                          Request Status:
                        </span>
                        <span className={`Status ${r.Status}`}></span>
                      </div>
                    ) : (
                      <div>
                        <span
                          style={{
                            color: "#56606E",
                            fontSize: "13.3px",
                            fontWeight: "400px",
                          }}
                        >
                          Request Status:
                        </span>
                        <span className={`Status ${r.Status}`}>{r.Status}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="notification-bottom">
                    {r.AdminReply.Reply == "null" ? (
                      <div>
                      <span
                        style={{
                          padding: "10px",
                          marginBottom: "12px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#606060",
                        }}
                      >
                        Admin Reply
                      </span>
                      <div className="admin_reply">No Reply</div>
                    </div>
                      
                    ) : (
                      <div>
                        <span
                          style={{
                            padding: "10px",
                            marginBottom: "12px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#606060",
                          }}
                        >
                          Admin Reply
                        </span>
                        <div className="admin_reply">{r.AdminReply.Reply}</div>
                      </div>
                    )}
                  </div>
                </div>
                <br />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Notification;
