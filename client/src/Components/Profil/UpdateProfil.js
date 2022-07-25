import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateProfil = () => {
  // Récupère l'userId du localstorage
  const id = JSON.parse(localStorage.getItem("token")).userId;
  // Récupère le token
  const accessToken = JSON.parse(localStorage.getItem("token")).token;
  const [userData, setUserData] = useState("");
  const [file, setFile] = useState();

  const emailError = document.querySelector(".email-profil.error");
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
  }, [id]);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", userData.userPicture);
    data.append("file", file);

    axios
      .put(`${process.env.REACT_APP_API_URL}profil/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setFile(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log(userData);

  const handleDelete = (e) => {
    if (window.confirm("Voulez-vous vraiment supprimer votre profil ?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}profil/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((e) => {
          localStorage.clear();
          window.location = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUser = () => {
    const regexEmail = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === regexEmail && email.length > 3) {
      axios
        .put(`${process.env.REACT_APP_API_URL}profil/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            firstName,
            lastName,
            email,
          },
        })

        .then((res) => {
          setFormSubmit(true);
        })

        .catch((err) => {
          console.error(err);
        });
    } else {
      emailError.innerHTML =
        "Une erreur s'est produite dans la saisie de l'adresse mail";
    }
  };

  return (
    <section className="profil-container">
      <div className="profil-container-img">
        <h1>
          Profil de {userData.firstName} {userData.lastName}
        </h1>
        <div className="upload-picture"></div>
        <h3>Photo de profil</h3>
        <img src={userData.userPicture} alt="photo-profil" />
        <form action="" onSubmit={handlePicture} className="upload-picture">
          <label htmlFor="file">Changer d'image</label>
          <input
            type="file"
            id="file"
            name="userPicture"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      </div>
      {formSubmit ? (
        <>
          <span></span>
          <h4 className="success">Modification enregistré !</h4>
        </>
      ) : (
        <div className="container-profil-user">
          <form action="" onSubmit={handleUser} id="update-profil">
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
              onClick={handleUser}
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
