import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { tokenContext } from "../Components/AppContext";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const { token } = useContext(tokenContext);

  return (
    <div className="profil-page">
      <Navbar />
      {!token ? <UpdateProfil /> : <Navigate to="/" />}
    </div>
  );
};

export default Profil;
