import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser } from "../actions/user.action";
import { dataContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const { dataUser } = useContext(dataContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.dataUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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
