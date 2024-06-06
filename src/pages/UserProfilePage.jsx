import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import emailIcon from "../assets/emailIcon.png";
import userIcon from "../assets/userIcon.png";
import "./UserProfilePage.css";

function UserProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div>
        <h2>
          <img src={emailIcon} alt="Email Icon" />
          <u>Email:</u> {user.email}
        </h2>
        <h2>
          <img src={userIcon} alt="User Icon" />
          <u>Type: </u> {user.isAdmin ? "Admin" : "Regular User"}
        </h2>
        <h2>
          {/* <img src={emailIcon} alt="Email Icon" />*/}
          <u>Id:</u> {user._id}
        </h2>
      </div>
    </div>
  );
}

export default UserProfilePage;
