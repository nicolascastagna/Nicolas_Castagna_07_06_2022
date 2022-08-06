import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../actions/user.action";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer.dataUser);
  const dispatch = useDispatch();

  const [updateForm, setUpdateForm] = useState(false);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const error = document.querySelector(".error");
  const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;

  const handleUpdate = (e) => {
    error.innerHTML = "";
    if (firstName.length > 2 && lastName.length > 2) {
      dispatch(updateUser(userData.id, firstName, lastName));
      setUpdateForm(false);
    } else {
      e.preventDefault();
      error.innerHTML = "Veuillez renseigner un minimum de 3 caractères";
    }
    // error.innerHTML = "";
    // if (firstName.length < 2 && lastName.length < 2) {
    //   e.preventDefault();
    //   error.innerHTML = "Veuillez renseigner un minimum de 3 caractères";
    //   return false;
    // } else if (!regex) {
    //   error.innerHTML =
    //     "Merci de ne pas écrire de caractères spéciaux ni de chiffres";
    //   return false;
    // } else {
    //   dispatch(updateUser(userData.id, firstName, lastName));
    //   setUpdateForm(false);
    //   return true;
    // }
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
              value={firstName}
              required
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
              value={lastName}
              required
              placeholder="Ecrivez votre nouveau nom..."
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="lastName-profil error"></div>
            {updateForm === false && (
              <input
                type="submit"
                id="confirm-input"
                value="Valider les modifications"
                onClick={handleUpdate}
              />
            )}
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
