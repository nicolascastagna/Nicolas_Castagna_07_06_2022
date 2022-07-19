import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentification />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
