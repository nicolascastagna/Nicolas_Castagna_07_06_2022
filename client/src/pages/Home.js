import React, { useContext, useEffect } from "react";
import { dataContext } from "../Components/AppContext";
import Login from "../Components/Log/Login";
import Navbar from "../Components/Navbar";
import Thread from "../Components/Thread";

const Home = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="home">
      <Navbar />
      <div className="main">{!dataUser ? <Thread /> : <Login />}</div>
    </div>
  );
};

export default Home;
