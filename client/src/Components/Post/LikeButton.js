import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer.dataUser);
  const token = JSON.parse(localStorage.getItem("token"));

  const likeHandler = (e) => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
    likePost();
  };

  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}like`, {
        headers: {
          Authorization: "Bearer " + token.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLikes(res.data.Likes.length);
        res.data.Likes.map((likes) => {
          if (likes.UserId === userData.id && likes.PostId === post.id) {
            setIsLiked(true);
          }
        });
      })
      .catch((err) => err);
  };

  const likePost = () => {
    console.log(post.id);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}like/${post.id}`,
      data: { UserId: token.userId, likes: 1 },
      headers: {
        Authorization: "Bearer " + token.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Vous avez aimé le post !") {
          setIsLiked(true);
        } else if (res.data.message === "Vous n'aimez plus le post !") {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="like-container">
      <span className="heart-action" onClick={likeHandler}>
        {isLiked ? (
          <>
            <img src="./img-project/heart-filled.svg" alt="like" />
          </>
        ) : (
          <>
            <img src="./img-project/heart.svg" alt="unlike" />
          </>
        )}
      </span>

      <span>{post.likes}</span>
    </div>
  );
};

export default LikeButton;
