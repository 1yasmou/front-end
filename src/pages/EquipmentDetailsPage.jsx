import React, { useContext, useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "./EquipmentDetailsPage.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function EquipementDetailsPage() {
  const [equipement, setEquipement] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(1);
  const { equipementId } = useParams();
  const { user } = useContext(AuthContext);
  const [editCommentId, setEditCommentId] = useState(null);

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
    setCommentContent(comment.comment); // Ajout - Pré-remplir le contenu du commentaire lors de la modification
    setCommentRating(comment.rating); // Ajout - Pré-remplir la note lors de la modification
    setEditCommentId(comment._id); // Ajout - Stocker l'ID du commentaire en cours de modification
  };

  const handleCancelEdit = () => {
    setCommentContent("");
    setCommentRating(1);
    setEditCommentId(null); //
  };

  ////////////////////////

  const submitComment = async (event) => {
    event.preventDefault();
    if (editCommentId) {
      // Mise à jour du commentaire
      try {
        const updatedCommentData = {
          comment: commentContent,
          rating: commentRating,
        };
        await apiHandler.updateComment(editCommentId, updatedCommentData);
        const updatedComments = comments.map((comment) => {
          if (comment._id === editCommentId) {
            return {
              ...comment,
              comment: commentContent,
              rating: commentRating,
            };
          }
          return comment;
        });
        setComments(updatedComments);
      } catch (error) {
        console.error("Error Update comment: ", error);
      }
      handleCancelEdit();
    } else {
      try {
        const commentData = {
          comment: commentContent,
          rating: commentRating,
        };
        await apiHandler.createComment(equipementId, commentData);
        setCommentContent("");
        setCommentRating(0);
        setEditCommentId(null);
        // fetchComments();
        const response = await apiHandler.getCommentsForEquipment(equipementId);
        setComments(response.data);
      } catch (error) {
        console.error("Error AJOUT comment: ", error);
      }
    }
  };

  /*async function fetchDataAndDisplay() {
    try {
      const commentsWithAuthorDetails = await Comment.find().populate(
        "author",
        "email"
      );

      console.log(commentsWithAuthorDetails);
    } catch (error) {
      console.error(error);
    }
  }
  fetchDataAndDisplay();*/

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
        <strong>CODE POSTAL:</strong> {equipement.inst_cp}
      </p>
      <p>
        <strong>ARRONDISSEMENT:</strong> {equipement.arrondissement}
      </p>

      <p>
        <strong>CREATION:</strong> {equipement.equip_service_date}
      </p>
      <p>
        <strong>SITE INTERNET:</strong> {equipement.equip_url}
      </p>
      <p>
        <p>
          <strong>NATURE: </strong>
          {equipement.equip_nature}
        </p>
        <p>
          <strong>ACCESSIBILITE:</strong>{" "}
          {equipement.inst_acc_handi_bool ? "Oui" : "Non"}
        </p>
        <strong>STRUCTURE:</strong> {equipement.equip_type_name}
      </p>
      <p>
        <strong>OBSERVATIONS:</strong> {equipement.inst_obs}
      </p>

      <div className="commentaires-container">
        <h3>Commentaires sur: {equipement.inst_nom}</h3>
        <p>. </p>
        <p> </p>
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

              {user._id === comment.author && (
                <>
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
                </>
              )}

              <p>.</p>
            </li>
          ))}
        </ul>

        <form onSubmit={submitComment}>
          <div>
            <label htmlFor="comment">Ajouter un commentaire:</label>
            <textarea
              id="comment"
              value={commentContent}
              onChange={handleCommentContentChange}
              placeholder="commentaire:"
            />
          </div>
          <div>
            <label htmlFor="rating">Note (de 1 à 5):</label>
            <select
              id="rating"
              value={commentRating}
              onChange={handleCommentRatingChange}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                return (
                  <option value={n} selected={n === commentRating}>
                    {n}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="button submit-button" type="submit">
            {editCommentId ? "Modifier" : "Ajouter un commentaire"}
          </button>
          {editCommentId && (
            <button className="button cancel-button" onClick={handleCancelEdit}>
              Annuler
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default EquipementDetailsPage;
