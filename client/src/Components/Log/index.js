import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Log = (props) => {
  const [signupForm, setSignupForm] = useState(props.signup);
  const [loginForm, setLoginForm] = useState(props.login);

  const handleForm = (e) => {
    if (e.target.id === "register") {
      setSignupForm(true);
      setLoginForm(false);
    } else if (e.target.id === "login") {
      setSignupForm(false);
      setLoginForm(true);
    }
  };

  return (
    <div>
      <div className="form-container">
        <ul>
          <li
            onClick={handleForm}
            id="register"
            className={signupForm ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleForm}
            id="login"
            className={loginForm ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
      </div>
      <div className="connection-form">
        {signupForm && <Signup />}
        {loginForm && <Login />}
      </div>
    </div>
  );
};

export default Log;
