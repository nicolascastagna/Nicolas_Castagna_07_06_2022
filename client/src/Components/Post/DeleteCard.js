import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/post.action";
import { getUser } from "../../actions/user.action";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(props.id));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          handleDelete();
          window.location.reload();
        }
      }}
    >
      <img src="./img-project/delete.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
