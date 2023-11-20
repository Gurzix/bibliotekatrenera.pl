import React, { useState, useEffect } from "react";
import "./forgotPassword.scss";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const handleClick = async (req, res) => {
    try {
      axios.post("http://45.93.139.98/api/auth/forgotPassword", {
        email,
      });
      setSuccess("Mail wysłano");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forgotPassword">
      <p className="resetP">Reset hasła</p>
      <div className="box">
        <label htmlFor="login">Email</label>
        <input
          id="login"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleClick}>Wyślij</button>
      </div>
      <p className="successMailSent">{success}</p>
    </div>
  );
};
