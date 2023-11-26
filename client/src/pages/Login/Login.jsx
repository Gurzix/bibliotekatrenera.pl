import React from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://bibliotekatrenera.pl/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <h2 className="loginH2">Logowanie</h2>
      <form className="loginForm">
        <label className="label" htmlFor="username">
          Podaj email:
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="email"
          className="loginInput"
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
        <Link to="/forgotPassword" className="link">
          <p className="forgotPasswordLink link">Zapomniałeś hasła?</p>
        </Link>
        <button type="submit" className="loginButton" onClick={handleClick}>
          Potwierdź
        </button>
        {error && <span style={{ marginTop: "20px" }}>{error}</span>}
      </form>
    </div>
  );
};
