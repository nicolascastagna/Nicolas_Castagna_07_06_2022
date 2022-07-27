import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.action";
import { isEmpty } from "../../Utils";
import { dateParser } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const CardPost = ({ post }) => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const usersData = useSelector((state) => state.usersReducer.dataAllUsers);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <div className="main-card" key={post.id}>
      <div className="card-left">
        <img
          src={
            !isEmpty(usersData[0]) &&
            usersData
              .map((user) => {
                if (user.userId === post.id) return user.userPicture;
                else return null;
              })
              .join("")
          }
          alt="user-picture"
        />
      </div>
      <div className="card-right">
        <div className="card-header">
          <div className="name-user">
            <h3>
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.userId === post.PostId)
                      return user.firstName + " " + user.lastName;
                    else return null;
                  })
                  .join("")}
            </h3>
          </div>
          <span>{dateParser(post.createdAt)}</span>
        </div>

        {isUpdated === false && <p>{post.postText}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={post.postText}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="button-container">
              <button className="btn" onClick={updateItem}>
                Valider modification
              </button>
            </div>
          </div>
        )}
        {post.postFile && (
          <img
            src={post.postFile}
            alt="card-picture"
            className="card-picture"
          />
        )}
        {userData.userId === post.postId && (
          <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
              <img src="./img-project/edit.svg" alt="edit" />
            </div>
            <DeleteCard id={post.postId} />
          </div>
        )}
      </div>
      <div className="card-footer">
        <LikeButton post={post} />
      </div>
    </div>
  );
};

export default CardPost;
