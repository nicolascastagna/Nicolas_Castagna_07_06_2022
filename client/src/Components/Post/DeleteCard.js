import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

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
