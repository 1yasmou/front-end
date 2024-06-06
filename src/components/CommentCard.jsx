// CommentCard.jsx

import React from "react";

function CommentCard({
  comment,
  handleDeleteComment,
  handleEditComment,
  user,
}) {
  console.log(user._id, comment.author);

  return (
    <li key={comment._id} className="comment-card">
      <p>
        <strong>Auteur:</strong> {comment.author.email}
      </p>
      <p>
        <strong>Commentaire:</strong> {comment.comment}
      </p>
      <p>
        <strong>Note:</strong> {comment.rating}
      </p>
      <p>
        <strong>Date:</strong> {comment.createdAt}
      </p>
      {user._id === comment.author._id && (
        <>
          <button
            className="button delete-button"
            onClick={() => handleDeleteComment(comment._id)}
          >
            Supprimer
          </button>
          {handleEditComment && (
            <button
              className="button edit-button"
              onClick={() => handleEditComment(comment)}
            >
              Modifier
            </button>
          )}
        </>
      )}
    </li>
  );
}

export default CommentCard;
