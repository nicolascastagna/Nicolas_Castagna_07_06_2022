import React from "react";
import Navbar from "../Components/Navbar";
import Thread from "../Components/Thread";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="main">
        <Thread />
      </div>
    </div>
  );
};

export default Home;
