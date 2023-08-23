import { useState, useRef, useEffect } from "react";
import "./community.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tab from "../../components/CommunityTab/CommunityTab"
import axios from "axios"
import Modal from 'react-modal';
import { toast } from "react-toastify";
import ClipLoader
 from "react-spinners/ClipLoader";

const customStyles = {
  content: {
    top: '10%',
    left: '25%',
    width:"50rem",
    marginRight: '-50%',
    borderRadius:"10px",
    backgroundColor:"#E7E2EF"
    
  },
};
const Styles = {
  content: {
    top: '10%',
    left: '25%',
    width:"50rem",
    height:"20rem",
    marginRight: '-50%',
    borderRadius:"10px",
    backgroundColor:"#E7E2EF"
    
  },
};

const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",

};


function Reports() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [custom, setCustom] = useState(false);
  const [quesid, setId] = useState(true);
  const [cat, setCat] = useState();
  const [comments, setComments] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAnswer, setIsAnswer] = useState(false);
  const [refresh, setRefresh] = useState();
  const [description, setDescription] = useState();

  var shopOwnerid = localStorage.getItem("UserId");
  shopOwnerid = JSON.parse(shopOwnerid);
  var shopOwnerImage = localStorage.getItem("photo");
  shopOwnerImage = JSON.parse(shopOwnerImage);
  // console.log(id);

  function afterOpenModal() {
  }

  function openModal(id) {
    fetchAnswer(id)
  }
  function openModalAnswer(id) {
   setIsAnswer(true)
   setId(id)
  }

  function closeModal() {
    setIsOpen(false);
    setIsAnswer(false);
    // setComments("")
  }

  const fetchQues = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api//question/getQues`
    );
    if (data.success === true) {
      console.log("data", data);
      // setTotal(data.Count)

      setCat(data.questions);
      setLoading(false)
    } else {
      console.log(data.message);
    }

    // .then(fetchData())
  };

  const fetchAnswer = (id) => {
    axios
      .get(`http://localhost:5000/api/question/getAnswer/${id}`)
      .then(function (response) {
        // setProduct(response.data.product);
        console.log(response.data)
        setComments(response.data.questions.Answer)
        console.log(comments)
      });

      if(comments){
        setIsOpen(true);
      }

  };

  const Send = async (id) => {
    console.log(id);
    const Data = {
      quesId: quesid,
      userAnswer: description,
      userImg:shopOwnerImage
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/question/newAnsShopowner/${id}`,
      Data
    );
    if (data.success === true) {
      console.log(data);
      toast.success("Answer added successfully")
      setIsAnswer(false)
      setRefresh(!refresh);
      // setRequest(data.Requests);
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    // event listeners
    setLoading(true)
    setTimeout(()=>{
setLoading(false)
    },1000)
    fetchQues()
  
  }, [refresh]);


  return (
    <div className="Community">
      <Sidebar />
      <div className="CommunityContainer">
        <Navbar />
        <div className="Community-main">
           <Tab/>
          {loading ? 
          <div style={{display: "flex",
         justifyContent: "center",
          alignItems: "center",
          marginTop:"100px",
          width:" 100%"}}>
            <ClipLoader
        color="#6436d6"
        loading={loading}
        size={100}
       
        
      />
            </div>
          : <div>
         <div className="post-question">
         {/* <h1>Post Question</h1> */}
         <br/>
        </div>
          {cat &&
          cat.map((r) => {
            return (
              <>
                <div className="request-container">
                  <div className="notificatio-top">
                    <img
                      src={r.userImg}
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
                      {r.name}
                    </span>
                  </div>
                  <div className="notification-between">
                    <span style={{
                        // color: "#56606E",
                        fontSize: "14px",
                        fontWeight: "550",
                        
                      }} >Question</span>
                    <p
                      style={{
                        color: "#56606E",
                        fontSize: "13.5px",
                        fontWeight: "400",
                        
                      }}
                    >
                      {r.userQues}
                    </p>
                    {/* <span onClick={()=>setIsOpen(true)}>View Comments</span> */}
                    <button onClick={()=>openModal(r._id)}>view Comments</button>
                    <button onClick={()=>openModalAnswer(r._id)}>Add comment</button>
                    <div>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      // onRequestClose={closeModal}
                      style={customStyles}
                      // className="customStyles"
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                     <div style={{display:"flex"}}>
                      <h3 style={{flex:"8",color:"#626262"}}>All Answers</h3>
                     <button className="ui button" style={{backgroundColor:"#8266B5",color:"white"}} onClick={()=>closeModal()}>Close</button>
                      </div>
                     {
      comments && comments.length===0 ? <div>
         No Answers
        </div> :
       comments && comments.map((rev) => (
        <div className="review" style={{ padding: "20px"}}>
          <div className="cellWrapper" style={{display: "flex",alignItems:"center"
          }}>
            <div className="img" >
              <img
                src={rev.userImg}
                alt=""
                className="image"
                style={{width:"54px",height:"54px",marginRight:"10px",objectFit:"cover",borderRadius:"1rem"}}
              />
            </div>
            <div className="detail" style={{display: "flex",flexDirection:"column"}}>
              <span className="div" style={{fontSize:"14px",fontWeight:"500"}}>{rev.name}</span>
              <p className="div" style={{color:"#7B7780"}}>{rev.userAnswer}</p>
            </div>
          </div>
          <div className="ui dividing header"></div>
        </div>
      ))
       }
                     
                     
                    </Modal>
                  </div>
                  <div>
                    <Modal
                      isOpen={modalAnswer}
                      onAfterOpen={afterOpenModal}
                      // onRequestClose={closeModal}
                      style={Styles}
                      // className="customStyles"
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                      <div style={{display:"flex"}}>
                      <h3 style={{flex:"8",color:"#626262"}}>Add Answer</h3>
                     <button className="ui button" style={{backgroundColor:"#8266B5",color:"white"}} onClick={()=>closeModal()}>Close</button>
                      </div>
          
                    <div>Your Answer</div>
                    <div>
                        <div className="ui form">
                          <div>
                            {/* <span>Reply</span> */}
                            <textarea
                              rows="4"
                              placeholder="Reply"
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <div
                          style={{
                            // textAlign: "end",
                            color: "#6439ff",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "max-content",
                            marginLeft:"96%"
                          }}
                          onClick={() => Send(shopOwnerid)}
                        >
                          Send
                        </div>
                        </div>
                        
                      </div>

                     
                     
                    </Modal>
                  </div>
                    {/* {!comments ? <span 
                    onClick={()=>{{setComments(true);setIsOpen(true)}}}
                    // onClick={{()=>setComments(true)
                    // setIsOpen(true)}} 
                    style={{cursor:"pointer"}}>View comments</span>: 
                    } */}
                    {/* {r.Status === "null" ? (
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
                        <span className={`Status`}></span>
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
                    )} */}
                  </div>
                  
                  {/* <div className="notification-bottom">
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
                  </div> */}
                </div>
                <br />
              </>
            );
          })}
</div>}
         
        


        </div>
  
       
       

      </div>
    </div>
  );
}

export default Reports;
