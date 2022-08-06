import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost, unlikePost } from "../../actions/post.action";
import { dataContext } from "../AppContext";
import { isEmpty } from "../../Utils";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dataUser = useContext(dataContext);
  const allLikes = useSelector((state) => state.postReducer);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikes(post.id));
  }, [dispatch, post.id]);

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
      {/* {!isEmpty(allLikes[0]) &&
        allLikes
          .map((like) => {
            console.log(likes);
            if (like.UserId === like.PostId) return like.id;
            else return null;
          })
          .join("")} */}
    </div>
  );
};

export default LikeButton;
