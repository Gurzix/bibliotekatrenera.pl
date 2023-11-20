import React, { useState, useContext } from "react";
import "./search.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Search = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [howManyPlayers, setHowManyPlayers] = useState("");
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate("/posts", { state: { title, category, howManyPlayers } });
  };

  const { user } = useContext(AuthContext);
  return (
    <div className="search-wrapper">
      <div className="inputContainer">
        <input
          className=""
          type="text"
          id="exercise"
          placeholder="nad czym chcesz pracować"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="excersise">Wyszukaj ćwiczenie</label>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          id="category"
          placeholder="np. technika"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="category">Kategoria</label>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          id="players"
          placeholder="np. 12"
          onChange={(e) => setHowManyPlayers(e.target.value)}
        />
        <label htmlFor="players">Ilość zawodników</label>
      </div>
      <div className="button-container">
        <button
          className={user ? "search-button" : "disabledButton"}
          type="button"
          disabled={!user && true}
          onClick={searchHandler}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
};
