import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";

const Signup = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const emailError = document.querySelector(".email.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    // Vérification si password n'est pas identique et si terms n'est pas coché
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}auth/signup`,
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      })
        .then((res) => {
          setFormSubmit(true);
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.error) {
            emailError.innerHTML = err.response.data.error;
          }
          if (err.response.data.error.errors[0].value) {
            emailError.innerHTML =
              err.response.data.error.errors[0].value + " est déjà utilisé !";
          }
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-in-form">
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            pattern="[A-Za-z]{2,20}"
            title="Le prénom doit contenir minimum 2 lettres"
            required
          />
          <div className="firstName error"></div>
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
            pattern="[A-Za-z]{2,20}"
            title="Le nom doit contenir minimum 2 lettres"
          />
          <div className="lastName error"></div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="email error"></div>
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6}"
            title="Le mot de passe doit être de minimum 6 caractères avec une minuscule, une majuscule et un chiffre."
          />
          <div className="password error"></div>
          <label htmlFor="password-conf">Confirmez mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            required
            title="Les mots de passe doivent être identiques"
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            {" "}
            J'accepte les
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default Signup;
