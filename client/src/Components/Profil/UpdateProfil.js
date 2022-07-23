import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateProfil = () => {
  // Récupère l'userId du localstorage
  const id = JSON.parse(localStorage.getItem("token")).userId;
  // Récupère le token
  const accessToken = JSON.parse(localStorage.getItem("token")).token;
  const [userData, setUserData] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [file, setFile] = useState();

  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

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
  }, [id, accessToken]);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", userData.id);
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
    axios
      .put(`${process.env.REACT_APP_API_URL}profil/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          firstName,
          lastName,
        },
      })

      .then((res) => {
        setFormSubmit(true);
        localStorage.setItem("token", res);
      })

      .catch((err) => {
        console.error(err);
      });
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
            name="profilePicture"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setProfilePicture(e.target.files[0])}
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
            <div className="firstName error"></div>
            <label htmlFor="lastName">Nom</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ecrivez votre nouveau nom..."
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="lastName error"></div>
            <input
              type="submit"
              value="Valider les modifications"
              onSubmit={handleUser}
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
