import "./tab.scss";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"

function Tab() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const actArray = [];
  for (let i = 0; i < 4; i++) {
    if (i === value) {
      actArray.push("btn active");
    } else {
      actArray.push("btn");
    }
  }

  return (
    <div className="Tab">
      <h1>Reports and Analysis</h1>
      <ul style={{ listStyle: "none" }}>
        
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[0]}
            onClick={() => {{
                setValue(0);
              navigate("/reports");
             
            
            }}}
          >
            Orders
          </button>
        </li>
        
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[1]}
            onClick={() => {
                setValue(1);
                navigate("/sales");
              }}
          >
            Sales
          </button>
        </li>
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[2]}
            // disabled
            onClick={() => {
              setValue(2);
              navigate("/inventory");
            }}
          >
            Inventory
          </button>
        </li>
        <li style={{ float: "left" }}>
          <button
            type="button"
            className={actArray[3]}
            onClick={() => {
              setValue(3);
            }}
          >
            TAB Four
          </button>
        </li>
      </ul>
      <br />
      <br />
    </div>
  );
}

export default Tab;
