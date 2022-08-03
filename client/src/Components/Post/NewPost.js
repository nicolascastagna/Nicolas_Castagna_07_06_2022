import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createPost, getPostId } from "../../actions/post.action";
import { isEmpty, timestampParser } from "../Utils";

const NewPost = () => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handlePost = async () => {
    if (postText || postFile) {
      const data = new FormData();
      data.append("postText", postText);
      data.append("userId", userData.id);
      if (file) data.append("file", file);

      await dispatch(createPost(data));
      dispatch(getPostId());
      cancelPost();
      // window.location.reload();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setPostText("");
    setPostFile("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <img
          className="load-spinner"
          src="./img-project/loading-spinner.svg"
          alt=""
        />
      ) : (
        <>
          <div className="user-info">
            <NavLink to="/profil">
              <img src={userData.userPicture} alt="user-img" />
            </NavLink>
          </div>
          <div className="post-form">
            <textarea
              name="postText"
              id="message"
              placeholder="Publier quelque chose..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            {postText || postFile ? (
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
                  <p>{postText}</p>
                  <img src={postFile} alt="" className="card-picture" />
                </div>
              </div>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(postFile) && (
                  <>
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
                  </>
                )}
              </div>
              <div className="btn-send">
                {postText || postFile ? (
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
        </>
      )}
    </div>
  );
};

export default NewPost;
