import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost } from "../actions/post.action";
import { isEmpty } from "../Utils";
import { dataContext } from "./AppContext";
import CardPost from "./Post/CardPost";

const Thread = () => {
  // const dataUser = useContext(dataContext);
  const posts = useSelector((state) => state.allPostsReducer.allPostsData);
  const [loadPosts, setLoadPosts] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadPosts) {
      dispatch(getAllPosts());
      setLoadPosts(false);
    }
  }, [loadPosts, dispatch]);

  return (
    <div className="thread-container">
      <h1>Fil d'actualité</h1>
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <CardPost post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
