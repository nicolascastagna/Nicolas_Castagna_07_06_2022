import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllPosts } from "../actions/post.action";
import { isEmpty } from "./Utils";
import { dataContext } from "./AppContext";
import CardPost from "./Post/CardPost";
import NewPost from "./Post/NewPost";

const Thread = () => {
  const dataUser = useContext(dataContext);
  const posts = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="thread-container">
      {!dataUser && <Navigate to="/" />}
      <h1>Fil d'actualité</h1>
      <NewPost />
      <ul className="thread">
        {!isEmpty(posts[0]) ? (
          posts.map((post) => {
            return <CardPost post={post} key={post.id} />;
          })
        ) : (
          <h2 className="no-posts">Aucun post sur le fil d'actualité !</h2>
        )}
      </ul>
    </div>
  );
};

export default Thread;
