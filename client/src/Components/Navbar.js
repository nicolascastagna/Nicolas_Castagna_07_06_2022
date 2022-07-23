import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { tokenContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const id = JSON.parse(localStorage.getItem("token")).userId;
  const accessToken = JSON.parse(localStorage.getItem("token")).token;
  const [userData, setUserData] = useState("");
  const { token } = useContext(tokenContext);

  useEffect(() => {
    const dataProfil = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}profil/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(res.data);
    };
    dataProfil();
  }, [userData]);

  return (
    <nav className="nav-container">
      {token ? (
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
              <h4>Hello {userData.firstName}</h4>
            </li>
            <NavLink to="/profil">
              <img
                src={userData.userPicture}
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
