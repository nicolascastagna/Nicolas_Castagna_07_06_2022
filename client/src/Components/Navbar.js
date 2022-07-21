import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { tokenContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const { token } = useContext(tokenContext);

  return (
    <nav className="nav-container">
      {token ? (
        <ul></ul>
      ) : (
        <ul>
          <div className="nav-menu">
            <li className="welcome">
              <h4>Hello firstName + lastName</h4>
            </li>
            <NavLink to="/home">
              <h4>Accueil</h4>
            </NavLink>
            <NavLink to="/profil">
              <h4>Profil</h4>
            </NavLink>
            <Logout />
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
