import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { dataContext } from "../Components/AppContext";
import Login from "../Components/Log/Login";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="profil-page">
      <Navbar />
      {!dataUser ? <UpdateProfil /> : <Navigate to="/" />}
    </div>
  );
};

export default Profil;
