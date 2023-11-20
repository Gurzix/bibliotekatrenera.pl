import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.scss";
import axios from "axios";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://45.93.139.98/api/contact/sendMessage",
        {
          email,
          text,
          name,
        }
      );
      navigate("/messageSent", { state: { name } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="contact">
      <h2 className="contactH2">Kontakt</h2>
      <form className="contactForm">
        <label className="label" htmlFor="contactInput">
          Podaj imię:
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="contactInput"
          className="contactInput input"
        />
        <label className="label" htmlFor="contactMail">
          Podaj email:
        </label>
        <input
          type="mail"
          id="contactMail"
          className="mail input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="contactMessage">
          Jak możemy Ci pomóc?
        </label>
        <textarea
          name=""
          id="contactMessage"
          cols="30"
          rows="10"
          className="input"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="contactButton" type="submit" onClick={sendMessage}>
          Potwierdź
        </button>
      </form>
    </div>
  );
};
