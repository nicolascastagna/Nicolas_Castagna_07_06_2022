import React, { useContext } from "react";
import { dataContext } from "../Components/AppContext";
import Login from "../Components/Log/Login";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="profil-page">
      <Navbar />
      {!dataUser ? <UpdateProfil /> : <Login />}
    </div>
  );
};

export default Profil;
