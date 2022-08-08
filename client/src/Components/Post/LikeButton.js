import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost, unlikePost } from "../../actions/post.action";
import { isEmpty } from "../../Utils";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(true);
  const userData = useSelector((state) => state.userReducer.dataUser);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  // useEffect(() => {
  //   dispatch(getLikes(post.id));
  // }, [dispatch, post.id]);

  const like = (e) => {
    dispatch(likePost(post.id, userData.id));

    window.location.reload();
    alert("Vous avez liké le post !");
  };
  const unlike = () => {
    dispatch(unlikePost(post.id, userData.id));
    window.location.reload();
    alert("Vous avez disliké le post !");
  };

  useEffect(() => {
    if (post.id && userData.id) {
      setLiked(false);
    } else setLiked(true);
  }, [userData.id, liked, post.Likes]);

  // useEffect(() => {
  //   if (post.id && userData.id && post.Likes.length === 1) {
  //     setLiked(true);
  //   } else setLiked(false);
  // }, [liked, userData.id, post.Likes]);

  return (
    <div className="like-container">
      {userData.id && liked === false && (
        <img src="./img-project/heart.svg" onClick={like} alt="like" />
      )}
      {userData.id && liked && (
        <img
          src="./img-project/heart-filled.svg"
          onClick={unlike}
          alt="unlike"
        />
      )}
      <span>{post.Likes.length}</span>
    </div>
  );
};

export default LikeButton;
