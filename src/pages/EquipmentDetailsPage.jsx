import React, { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "./EquipmentDetailsPage.css";
import { useParams } from "react-router-dom";

function EquipementDetailsPage() {
  const [equipement, setEquipement] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const { equipementId } = useParams();

  useEffect(() => {
    async function fetchEquipementDetails() {
      try {
        const response = await apiHandler.getEquipementDetails(equipementId);
        setEquipement(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchComments() {
      try {
        const response = await apiHandler.getCommentsForEquipment(equipementId);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEquipementDetails();
    fetchComments();
  }, [equipementId]);

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
    console.log("Nouvelle valeur de comment : ", event.target.value);
  };

  const handleCommentRatingChange = (event) => {
    setCommentRating(event.target.value);
    console.log("Nouvelle valeur de rating : ", event.target.value);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await apiHandler.deleteComment(commentId);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  ///////////////////////
  const handleEditComment = async (comment) => {
    const updatedComment =
      prompt("Modifier le commentaire :", comment.comment) || comment.comment;
    const updatedRating =
      parseInt(prompt("Modifier la note (1-5) :", comment.rating)) ||
      comment.rating;
    if (
      updatedComment !== null &&
      updatedRating !== null &&
      updatedRating >= 1 &&
      updatedRating <= 5
    ) {
      try {
        const updatedCommentData = {
          comment: updatedComment,
          rating: updatedRating,
        };
        await apiHandler.updateComment(comment._id, updatedCommentData);
        const index = comments.findIndex((c) => c._id === comment._id);
        if (index !== -1) {
          const updatedComments = [...comments];
          updatedComments[index] = {
            ...comment,
            comment: updatedComment,
            rating: updatedRating,
          };
          setComments(updatedComments);
        }
      } catch (error) {
        console.error("Error updating comment: ", error);
      }
    }
  };

  ////////////////////////

  const submitComment = async (event) => {
    event.preventDefault();
    try {
      const commentData = {
        comment: commentContent,
        rating: commentRating,
      };
      await apiHandler.createComment(equipementId, commentData);
      setCommentContent("");
      setCommentRating(0);
      // fetchComments();
      const response = await apiHandler.getCommentsForEquipment(equipementId);
      setComments(response.data);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (!equipement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="equipement-details">
      <h2>{equipement.inst_nom}</h2>
      <p>
        <strong>ADRESSE:</strong> {equipement.inst_adresse}
      </p>
      <p>
        <strong>OBSERVATIONS:</strong> {equipement.inst_obs}
      </p>
      <p>
        <strong>ARRONDISSEMENT:</strong> {equipement.arrondissement}
      </p>

      <h3>Commentaires :</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>
              <strong>Auteur:</strong> {comment.author}
            </p>
            <p>
              <strong>Commentaire:</strong> {comment.comment}
            </p>
            <p>
              <strong>Note:</strong> {comment.rating}
            </p>
            {/*
            {currentUser === comment.author && (
              <>
                <button
                  className="button edit-button"
                  onClick={() => handleEditComment(comment)}
                >
                  Modifier
                </button>
                <button
                  className="button delete-button"
                  onClick={() =>
                    handleDeleteComment(comment._id, comment.author)
                  }
                >
                  Supprimer
                </button>
              </>
            )}*/}

            <button
              className="button delete-button"
              onClick={() => handleDeleteComment(comment._id)}
            >
              Supprimer
            </button>
            <button
              className="button edit-button"
              onClick={() => handleEditComment(comment)}
            >
              Modifier
            </button>
          </li>
        ))}
      </ul>

      <form>
        <div>
          <label htmlFor="comment">Ajouter un commentaire:</label>
          <textarea
            id="comment"
            value={commentContent}
            onChange={handleCommentContentChange}
            placeholder="Votre commentaire"
          />
        </div>
        <div>
          <label htmlFor="rating">Note (de 1 à 5):</label>
          <select
            id="rating"
            value={commentRating}
            onChange={handleCommentRatingChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button className="button submit-button" onClick={submitComment}>
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
}

export default EquipementDetailsPage;

/*import React, { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "./EquipmentDetailsPage.css";
import { useParams } from "react-router-dom";

function EquipementDetailsPage() {
  const [equipement, setEquipement] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const { equipementId } = useParams();

  useEffect(() => {
    async function fetchEquipementDetails() {
      try {
        const response = await apiHandler.getEquipementDetails(equipementId);
        setEquipement(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEquipementDetails();
  }, [equipementId]);

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
    console.log("Nouvelle valeur de comment : ", event.target.value);
  };

  const handleCommentRatingChange = (event) => {
    setCommentRating(event.target.value);
    console.log("Nouvelle valeur de rating : ", event.target.value);
  };

  const submitComment = async () => {
    console.log(
      "Valeur de rating avant d'envoyer la requête : ",
      commentRating
    );
    try {
      const commentData = {
        comment: commentContent,
        rating: commentRating,
      };
      await apiHandler.createComment(equipementId, commentData);
      console.log(
        "Valeur de commentData après envoi la requête : ",
        commentData
      );
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (!equipement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="equipement-details">
      <h2>{equipement.inst_nom}</h2>
      <p>
        <strong>ADRESSE:</strong> {equipement.inst_adresse}
      </p>
      <p>
        <strong>OBSERVATIONS:</strong> {equipement.inst_obs}
      </p>
      <p>
        <strong>ARRONDISSEMENT:</strong> {equipement.arrondissement}
      </p>

      <form>
        <div>
          <label htmlFor="comment">Commentaires:</label>
          <textarea
            id="comment"
            value={commentContent}
            onChange={handleCommentContentChange}
            placeholder="Votre commentaire"
          />
        </div>

        <div>
          <label htmlFor="rating">Note (de 1 à 5):</label>
          <select
            id="rating"
            value={commentRating}
            onChange={handleCommentRatingChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button onClick={submitComment}>Ajouter un commentaire</button>
      </form>
    </div>
  );
}

export default EquipementDetailsPage;*/
