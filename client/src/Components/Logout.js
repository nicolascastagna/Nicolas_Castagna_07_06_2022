import React from "react";

const Logout = () => {
  const logout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.removeItem("token");
      window.location = "/";
    }
  };

  return (
    <h4 onClick={logout} id="log-out">
      Se déconnecter
    </h4>
  );
};

export default Logout;
