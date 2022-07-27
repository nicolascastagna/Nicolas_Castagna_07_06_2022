import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";
import { dataContext } from "../AppContext";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dataUser = useContext(dataContext);
  const userData = useSelector((state) => state.userReducer.dataUser);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.PostId, userData.userId));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post.PostId, userData.userId));
    setLiked(false);
  };

  useEffect(() => {
    if (post.Likes === dataUser) setLiked(true);
    else setLiked(false);
  }, [dataUser, post.Likes, liked]);

  return (
    <div className="like-container">
      {dataUser && liked === false && (
        <img src="./img-project/heart.svg" onClick={like} alt="like" />
      )}
      {dataUser && liked === true && (
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
