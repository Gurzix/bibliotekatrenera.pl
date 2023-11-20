import React from "react";
import soccer from "./img/soccer-illustrations-svgrepo-com.svg";
import tactis from "./img/soccer-tactical-sketch-of-players-movements-on-whiteboard-svgrepo-com.svg";
import games from "./img/football-child-svgrepo-com.svg";
import technique from "./img/construction-cone-attention-svgrepo-com.svg";
import fitness from "./img/fitness-sharp-svgrepo-com.svg";
import goalkeeper from "./img/football-sports-gloves-svgrepo-com.svg";
import "./categories.scss";
import { useEffect, useState } from "react";

export const Categories = ({ setCategory }) => {
  const [addClass, setAddClass] = useState("");
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setAddClass("addClass");
    } else {
      setAddClass("");
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`categories-wrapper ${addClass}`}>
      <div
        className="icon-wrapper"
        onClick={(e) => {
          setCategory("technika");
        }}
      >
        <img src={technique} alt="" />
        <p>Technika</p>
      </div>
      <div className={`icon-wrapper`} onClick={(e) => setCategory("taktyka")}>
        <img src={tactis} alt="" />

        <p>Taktyka</p>
      </div>
      <div className="icon-wrapper" onClick={(e) => setCategory("gry")}>
        <img src={games} alt="" />
        <p>Gry</p>
      </div>
      <div
        className="icon-wrapper"
        onClick={(e) => setCategory("trening indywidualny")}
      >
        <img src={soccer} alt="" />
        <p>Trening indywidualny</p>
      </div>
      <div className="icon-wrapper" onClick={(e) => setCategory("motoryka")}>
        <img src={fitness} alt="" />
        <p>Motoryka</p>
      </div>
      <div
        className="icon-wrapper"
        onClick={(e) => setCategory("trening bramkarski")}
      >
        <img src={goalkeeper} alt="" />
        <p>Trening bramkarski</p>
      </div>
    </div>
  );
};
