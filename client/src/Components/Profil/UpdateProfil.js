import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../actions/user.action";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const dispatch = useDispatch();

  const emailError = document.querySelector(".email-profil.error");
  const [updateForm, setUpdateForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = () => {
    dispatch(updateUser(userData.userId, email, firstName, lastName));
    setUpdateForm(false);
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre profil ?")) {
      dispatch(deleteUser(userData.id));
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <section className="profil-container">
      <div className="profil-container-img">
        <h1>
          Profil de {userData.firstName} {userData.lastName}
        </h1>
        <div className="upload-picture">
          <h3>Photo de profil</h3>
          <img src={userData.userPicture} alt="photo-profil" />
          <UploadImg />
        </div>
      </div>
      {updateForm ? (
        <>
          <span></span>
          <h4 className="success">Modification enregistré !</h4>
        </>
      ) : (
        <div className="container-profil-user">
          <form action="" onSubmit={handleUpdate} id="update-profil">
            <label htmlFor="firstName">Prénom</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Ecrivez votre nouveau prénom..."
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="firstName-profil error"></div>
            <label htmlFor="lastName">Nom</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ecrivez votre nouveau nom..."
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="lastName-profil error"></div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Ecrivez votre nouvelle adresse mail..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email-profil error"></div>
            <input
              type="button"
              id="confirm-input"
              value="Valider les modifications"
              onClick={handleUpdate}
            />
          </form>
        </div>
      )}
      <div className="delete-container">
        <button className="delete-profil" onClick={handleDelete}>
          Supprimer mon profil
        </button>
      </div>
    </section>
  );
};

export default UpdateProfil;
