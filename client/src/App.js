import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import { tokenContext } from "./Components/AppContext";

const App = () => {
  const [token, setToken] = useState(null);

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
  }, [token]);

  return (
    <tokenContext.Provider value={{ token }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </tokenContext.Provider>
  );
};

export default App;
