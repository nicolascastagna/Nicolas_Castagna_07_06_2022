import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import { dataContext } from "./Components/AppContext";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  getUser,
  updateUser,
  uploadPicture,
} from "./actions/user.action";
import { getUsers } from "./actions/users.action";
import { getAllPosts, getPost } from "./actions/post.action";

const App = () => {
  const [dataUser, setDataUser] = useState(null);
  const dispatch = useDispatch();

  // Vérification si le token est dans le localstorage
  useEffect(() => {
    const checkToken = () => {
      const verifyToken = localStorage.getItem("token");
      if (verifyToken) {
        const parseToken = JSON.parse(localStorage.getItem("token"));

        // Vide le localstorage si token n'est pas décodable ou expiré
        if (!parseToken || !parseToken.token) {
          localStorage.clear();
          window.location = "/";
        }
        // Mise à jour du localstorage
      } else {
        localStorage.setItem("token", verifyToken);
      }
    };
    checkToken();
    dispatch(getUser());
    dispatch(getUsers());
    // dispatch(uploadPicture());
    // dispatch(updateUser());
    // dispatch(deleteUser());
    dispatch(getAllPosts());
    dispatch(getPost());
  }, [dataUser, dispatch]);

  return (
    <dataContext.Provider value={{ dataUser, setDataUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </dataContext.Provider>
  );
};

export default App;
