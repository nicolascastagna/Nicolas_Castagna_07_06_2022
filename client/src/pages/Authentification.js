import React from "react";
import Log from "../Components/Log";
import Navbar from "../Components/Navbar";

const Authentification = () => {
  return (
    <div className="auth-page">
      <div className="log-container">
        <div className="img-container">
          <img src="./img/icon.png" alt="img-auth" />
        </div>
        <Log login={true} signup={false} />
      </div>
    </div>
  );
};

export default Authentification;
