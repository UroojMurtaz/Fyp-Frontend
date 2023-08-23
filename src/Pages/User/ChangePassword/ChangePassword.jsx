import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ChangePassword() {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPass] = useState();
  const [oldPassword, setOldPassword] = useState();

  const navigate = useNavigate();
  const UpdatePassword = async () => {
    if (newPassword == null || confirmPassword == null || oldPassword == null) {
      toast.error("Please fill All fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("New password not matched with confirm password");
    } else {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/me/update",
          {
            oldPassword,
            newPassword,
            confirmPassword,
          }
        );

        console.log(data);
        if (data.success === true) {
          toast.success("Password Updated Successfully");
          navigate("/users/profile");

          setOldPassword("");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div className="reset_password_main">
      <div className="sub-main">
        <div>
          <div>
            <div className="ui dividing header">Update Profile</div>
            <div className="form">
              <div class="ui left icon input">
                <input
                  type="text"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <i class="key icon"></i>
              </div>
            </div>
            <div className="form">
              <div class="ui left icon input">
                <input
                  type="text"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i class="lock icon"></i>
              </div>
            </div>
            <div className="form">
              <div class="ui left icon input">
                <input
                  type="text"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <i class="lock open icon"></i>
              </div>
            </div>
          </div>
          <div className="button">
            <div className="ui button" onClick={() => UpdatePassword()}>
              Change
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
