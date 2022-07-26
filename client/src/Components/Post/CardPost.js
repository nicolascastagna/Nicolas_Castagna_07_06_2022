import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils";

const CardPost = ({ post }) => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const usersData = useSelector((state) => state.usersReducer.dataAllUsers);
  const postsData = useSelector((state) => state.allPostsReducer.allPostsData);

  return (
    <div className="main-card" key={post.id}>
      <div className="card">
        <img
          src={
            !isEmpty(usersData[0]) &&
            usersData
              .map((user) => {
                if (user.userId === post.postId) return user.userPicture;
              })
              .join("")
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default CardPost;
