import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dataContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const { dataUser } = useContext(dataContext);

  const userData = useSelector((state) => state.userReducer);

  return (
    <nav className="nav-container">
      {dataUser ? (
        <ul></ul>
      ) : (
        <ul>
          <div className="nav-menu">
            <div className="img-container">
              <NavLink to="/home">
                <img src="./img/icon.png" alt="icon" />
              </NavLink>
            </div>
            <li className="welcome">
              <h4>Hello {userData.dataUser.firstName}</h4>
            </li>
            <NavLink to="/profil">
              <img
                src={userData.dataUser.userPicture}
                alt="photo-profil"
                id="photo-profil"
              />
            </NavLink>
            <Logout />
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
