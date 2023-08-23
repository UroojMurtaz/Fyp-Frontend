import "./communitytab.scss";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import Modal from 'react-modal';
import { toast } from "react-toastify";
import axios from "axios"

function Tab() {
  const [value, setValue] = useState(0);
  const [modalAnswer, setIsAnswer] = useState(false);
  const [description, setDescription] = useState();

  var shopOwnerid = localStorage.getItem("UserId");
  shopOwnerid = JSON.parse(shopOwnerid);
  var shopOwnerImage = localStorage.getItem("photo");
  shopOwnerImage = JSON.parse(shopOwnerImage);
  
  const navigate = useNavigate();

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

  const actArray = [];
  for (let i = 0; i < 4; i++) {
    if (i === value) {
      actArray.push("btnn activee");
    } else {
      actArray.push("btnn");
    }
  }

  function openModalAnswer(id) {
    setIsAnswer(true)
   }

   function closeModal() {
    setIsAnswer(false);
  }
  const Send = async (id) => {
    console.log(id);
    const Data = {
      userQues: description,
      userImg:shopOwnerImage
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/question/newQuesShopowner/${id}`,
      Data
    );
    if (data.success === true) {
      console.log(data);
      toast.success("Question added successfully")
      setIsAnswer(false)
      navigate("/community");
      // setRequest(data.Requests);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="Tab">
      <h1>Community</h1>
      <ul style={{ listStyle: "none" }}>
        
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[0]}
            onClick={() => {{
                setValue(0);
              navigate("/community");
             
            
            }}}
          >
            Questions & Answers
          </button>
        </li>
        
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[1]}
            onClick={() => {
                setValue(1);
                navigate("/community/postVideo");
              }}
          >
            Post Video
          </button>
        </li>
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[2]}
            onClick={() => {
                setValue(2);
                // navigate("/community/postVideo");
                setIsAnswer(true)
              }}
          >
            Post Question
          </button>
        </li>
        {/* <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[2]}
            // disabled
            onClick={() => {
              setValue(2);
              navigate("/inventory");
            }}
          >
            Post Question
          </button>
        </li> */}
      </ul>
      <br />
      <br />
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
        
                    <div>Enter Question</div>
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
    </div>
  );
}

export default Tab;
