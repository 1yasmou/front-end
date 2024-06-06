import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import emailIcon from "../assets/emailIcon.png";
import userIcon from "../assets/userIcon.png";
import "./UserProfilePage.css";
import CommentCard from "../components/CommentCard";
import apiHandler from "../utils/apiHandler";
import { useEffect, useState } from "react";

function UserProfilePage() {
  const { user } = useContext(AuthContext);
  const [userComments, setUserComments] = useState([]);

  const fetchUserComments = async () => {
    try {
      const response = await apiHandler.getUserComments(user._id);
      setUserComments(response.data);
    } catch (error) {
      console.error("Error à trouver comment usre: ", error);
    }
  };

  useEffect(() => {
    fetchUserComments();
  }, [user._id]);

  const handleDeleteComment = async (commentId) => {
    try {
      await apiHandler.deleteComment(commentId);
      const updatedComments = userComments.filter(
        (comment) => comment._id !== commentId
      );
      setUserComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

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
          <u>Id:</u> {user._id}
        </h2>
      </div>
      <h2>User Comments</h2>

      <ul>
        {userComments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}

export default UserProfilePage;
