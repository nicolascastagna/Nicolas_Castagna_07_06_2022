import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { dataContext } from "../Components/AppContext";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="profil-page">
      <Navbar />
      {dataUser ? <Navigate to="/" /> : <UpdateProfil />}
    </div>
  );
};

export default Profil;
