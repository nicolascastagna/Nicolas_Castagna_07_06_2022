import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPost from "./Post/CardPost";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [postData, setPostData] = useState([]);
  const [postText, setPostText] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const accessToken = JSON.parse(localStorage.getItem("token")).token;
  const id = JSON.parse(localStorage.getItem("token")).userId;

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}posts/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setPostData(res.data));
  };
  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 15) {
      setError(true);
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}posts/`, {
        headers: {
          Authorization: `Bearer + ${accessToken}`,
          "Content-Type": "application/json",
        },
        postText: "",
        userId: "",
        postDate: Date.now(),
      });
      setError(false);
      setPostText("");
      setContent("");
      getData();
    }
  };

  return (
    <div className="blog-container">
      <h1>Blog</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 15 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {postData
          .sort((a, b) => b.postDate - a.postDate)
          .map((post) => (
            <CardPost key={post.id} article={post} />
          ))}
      </ul>
    </div>
  );
};

export default Thread;
