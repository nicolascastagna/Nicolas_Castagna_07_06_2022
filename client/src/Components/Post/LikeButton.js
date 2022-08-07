import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost, unlikePost } from "../../actions/post.action";
import { dataContext } from "../AppContext";
import { isEmpty } from "../../Utils";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dataUser = useContext(dataContext);
  const allLikes = useSelector((state) => state.postReducer.postData);
  const userData = useSelector((state) => state.userReducer.dataUser);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikes(post.id));
  }, [dispatch, post.id]);

  const like = () => {
    dispatch(likePost(post.id, userData.id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post.id, userData.id));
    setLiked(false);
  };

  useEffect(() => {
    if (post.id === userData.id) setLiked(true);
    else setLiked(false);
  }, [userData.id, setLiked, post.id]);

  // useEffect(() => {
  //   !isEmpty(allLikes[0]) && setLiked(false);
  // }, [allLikes]);

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
      {/* {!isEmpty(postsData[0]) &&
        postsData
          .map((post) => {
            console.log(post.Likes);
            if (post.Likes.UserId === post.Likes.PostId) return setLiked(true);
            else return null;
          })
          .join("")} */}
    </div>
  );
};

export default LikeButton;
