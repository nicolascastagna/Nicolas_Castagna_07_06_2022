import React, { useContext } from "react";
import { tokenContext } from "../Components/AppContext";
import Login from "../Components/Log/Login";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const { token } = useContext(tokenContext);

  return (
    <div className="profil-page">
      <Navbar />
      {!token ? <UpdateProfil /> : <Login />}
    </div>
  );
};

export default Profil;
