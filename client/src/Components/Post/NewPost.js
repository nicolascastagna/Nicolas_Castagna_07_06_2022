import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getOnePost } from "../../actions/post.action";
import { timestampParser } from "../Utils";

const NewPost = () => {
  const userData = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("postId", userData.userId);
      data.append("postText", message);
      if (file) data.append("file", file);

      await dispatch(createPost(data));
      dispatch(getOnePost());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      <textarea
        name="message"
        id="message"
        placeholder="Publier un nouveau post ?"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      {message || postPicture ? (
        <li className="card-container">
          <div className="card-left">
            <img src={userData.picture} alt="user-pic" />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>{userData.firstName + " " + userData.lastName}</h3>
              </div>
              <span>{timestampParser(Date.now())}</span>
            </div>
            <div className="content">
              <p>{message}</p>
              <img src={postPicture} alt="" />
            </div>
          </div>
        </li>
      ) : null}
      <button className="send" onClick={handlePost}>
        Envoyer
      </button>
    </div>
  );
};

export default NewPost;
