import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import "./EquipmentPage.css";

function CreateCommentPage() {
  const [commentForm, setCommentForm] = useState({ comment: "", rating: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setCommentForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiHandler.createComment(commentForm);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}

      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="comment">
          my_comment:
          <input
            type="text"
            name="comment"
            id="comment"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="rating">
          rating:
          <textarea
            name="rating"
            id="rating"
            onChange={handleChange}
          ></textarea>
        </label>

        <input type="submit" value="Create Comment" />
      </form>
    </div>
  );
}

export default CreateCommentPage;
