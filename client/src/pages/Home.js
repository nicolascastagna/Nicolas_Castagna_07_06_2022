import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { dataContext } from "../Components/AppContext";
import Login from "../Components/Log/Login";
import Navbar from "../Components/Navbar";
import Thread from "../Components/Thread";

const Home = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="home">
      <Navbar />
      <div className="main">{!dataUser ? <Thread /> : <Navigate to="/" />}</div>
    </div>
  );
};

export default Home;
