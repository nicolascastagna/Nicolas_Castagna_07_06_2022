import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.action";
import { getUsers } from "../../actions/users.action";
import { isEmpty } from "../../Utils";
import { dateParser } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const CardPost = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer.dataUser);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
      window.location.reload();
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    !isEmpty(postsData[0]) && setIsLoading(false);
  }, [postsData]);

  return (
    <div className="main-card" key={post.id}>
      {isLoading ? (
        <img className="load-spinner" src="./img-project/loading-spinner.svg" />
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(postsData[0]) &&
                postsData
                  .map((user) => {
                    if (user.id === post.id) return user.User.userPicture;
                    else return null;
                  })
                  .join("")
              }
              alt="user-picture"
            />
            <div className="card-header">
              <div className="name-user">
                <h3>
                  {!isEmpty(postsData[0]) &&
                    postsData
                      .map((user) => {
                        if (user.id === post.id)
                          return user.User.firstName + " " + user.User.lastName;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
          </div>
          <div className="card-right">
            <div className="card-modify">
              {isUpdated === false && <p>{post.postText}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.postText}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-modify">
                    <button className="btn" onClick={updateItem}>
                      Valider modification
                    </button>
                  </div>
                </div>
              )}
            </div>
            {post.postFile && (
              <img
                src={post.postFile}
                alt="card-picture"
                className="card-picture"
              />
            )}
            <div className="button-container">
              {userData.id === post.User.id ? (
                <>
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img-project/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post.id} />
                </>
              ) : (
                userData.admin && (
                  <>
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <img src="./img-project/edit.svg" alt="edit" />
                    </div>
                    <DeleteCard id={post.id} />
                  </>
                )
              )}
              <LikeButton post={post} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPost;
