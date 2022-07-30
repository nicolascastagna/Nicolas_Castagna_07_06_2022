import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createPost, getPost } from "../../actions/post.action";
import { timestampParser } from "../Utils";

const NewPost = () => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("id", userData.id);
      data.append("postText", message);
      if (file) data.append("file", file);

      await dispatch(createPost(data));
      dispatch(getPost());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      <div className="user-info">
        <NavLink to="/profil">
          <img src={userData.userPicture} alt="user-img" />
        </NavLink>
      </div>
      <div className="post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        {message || postPicture ? (
          <div className="main-card">
            <div className="card-left">
              <img src={userData.userPicture} alt="user-pic" />
              <div className="card-header">
                <div className="name-user">
                  <h3>
                    {userData.firstName} {userData.lastName}
                  </h3>
                </div>
                <span>{timestampParser(Date.now())}</span>
              </div>
            </div>
            <div className="content">
              <p>{message}</p>
              <img src={postPicture} alt="" className="card-picture" />
              {/* <img src={postPicture} alt="" /> */}
            </div>
          </div>
        ) : null}
        <div className="footer-form">
          <div className="icon">
            <label htmlFor="file-upload">
              <img src="./img-project/no-picture.svg" alt="img" />
            </label>
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handlePicture(e);
              }}
            />
          </div>
          <div className="btn-send">
            {message || postPicture ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler message
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
