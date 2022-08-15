import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { dataContext } from "../Components/AppContext";
import Navbar from "../Components/Navbar";
import Thread from "../Components/Thread";

const Home = () => {
  const { dataUser } = useContext(dataContext);

  return (
    <div className="home">
      <Navbar />
      <div className="main">{dataUser ? <Navigate to="/" /> : <Thread />}</div>
    </div>
  );
};

export default Home;
