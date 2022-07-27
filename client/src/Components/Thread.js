import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost } from "../actions/post.action";
import { isEmpty } from "../Utils";
import { dataContext } from "./AppContext";
import CardPost from "./Post/CardPost";
import NewPost from "./Post/NewPost";

const Thread = () => {
  const posts = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="thread-container">
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
