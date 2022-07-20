import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // déclaration des div error
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      // Si jamais il y a une erreur dans la réponse du back :
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          emailError.innerHTML = res.data.error.email;
          passwordError.innerHTML = res.data.error.password;
        }
        // Et s'il n'y a pas d'erreur dans la réponse :
        else {
          window.location = "/home";
          localStorage.setItem("token", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        // Récupère la valeur rentré dans l'input et stocker dans email
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default Login;
