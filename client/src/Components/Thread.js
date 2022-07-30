import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllPosts } from "../actions/post.action";
import { isEmpty } from "../Utils";
import { dataContext } from "./AppContext";
import CardPost from "./Post/CardPost";
import NewPost from "./Post/NewPost";

const Thread = () => {
  const dataUser = useContext(dataContext);
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const posts = useSelector((state) => state.allPostsReducer.allPostsData);
  const dispatch = useDispatch();

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getAllPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost]);

  return (
    <div className="thread-container">
      {!dataUser && <Navigate to="/" />}
      <h1>Fil d'actualité</h1>
      <NewPost count={count} />
      <ul className="thread">
        {!isEmpty(posts[0]) ? (
          posts.map((post) => {
            return <CardPost post={post} count={count} key={post.id} />;
          })
        ) : (
          <h2 className="no-posts">Aucun post sur le fil d'actualité !</h2>
        )}
      </ul>
    </div>
  );
};

export default Thread;
