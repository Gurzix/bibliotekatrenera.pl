import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(null);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://45.93.139.98/api/auth/register",
        credentials
      );
      setRegistered(true);
      setTimeout(() => {
        navigate("/login");
      }, "2500");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h2 className="registerH2">Rejestracja</h2>
      <form className="registerForm">
        <label className="label" htmlFor="username">
          Podaj nazwę użytkownika:
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          className="registerUsernameInput"
        />
        <label className="label" htmlFor="email">
          Podaj email:
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="email"
          className="registerInput"
        />
        <label className="label" htmlFor="password">
          Podaj hasło:
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          className="password"
        />
        <button type="submit" className="registerButton" onClick={handleClick}>
          Potwierdź
        </button>

        {registered ? (
          <p className="confirmRegistration">
            Żeby się zalogować musisz potwierdzić swojego maila
          </p>
        ) : null}
      </form>
      {error ? (
        <span style={{ marginTop: "20px", color: "crimson" }}>
          {error.response.data}
        </span>
      ) : null}
    </div>
  );
};
