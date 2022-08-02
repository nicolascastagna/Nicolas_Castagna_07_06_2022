import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost, unlikePost } from "../../actions/post.action";
import { dataContext } from "../AppContext";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dataUser = useContext(dataContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id, dataUser));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post.id, dataUser));
    setLiked(false);
  };

  useEffect(() => {
    if (post.id === dataUser) setLiked(true);
    else setLiked(false);
  }, [dataUser, setLiked, post.id]);

  return (
    <div className="like-container">
      {dataUser && liked === false && (
        <img src="./img-project/heart.svg" onClick={like} alt="like" />
      )}
      {dataUser && liked && (
        <img
          src="./img-project/heart-filled.svg"
          onClick={unlike}
          alt="unlike"
        />
      )}
      {/* <span>{post.liked.length}</span> */}
    </div>
  );
};

export default LikeButton;
