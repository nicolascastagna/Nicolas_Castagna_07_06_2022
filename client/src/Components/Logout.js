import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const logout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.setItem("token", null);
      window.location = "/";
    }
  };

  return (
    <h4 onClick={logout} id="log-out">
      <img src="./img-project/logout.png" alt="logout" />
    </h4>
  );
};

export default Logout;
