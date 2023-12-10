import React from "react";
import soccer from "./img/soccer-illustrations-svgrepo-com.svg";
import tactis from "./img/soccer-tactical-sketch-of-players-movements-on-whiteboard-svgrepo-com.svg";
import games from "./img/football-child-svgrepo-com.svg";
import technique from "./img/construction-cone-attention-svgrepo-com.svg";
import fitness from "./img/fitness-sharp-svgrepo-com.svg";
import goalkeeper from "./img/football-sports-gloves-svgrepo-com.svg";
import "./categories.scss";
import { useEffect, useState } from "react";

export const Categories = ({ setCategory, category }) => {
  const [clickedElement, setClickedElement] = useState("");
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
  const categoriesIcons = [
    { id: 0, src: tactis, p: "taktyka" },
    { id: 1, src: technique, p: "technika" },
    { id: 2, src: games, p: "gry" },
    { id: 3, src: soccer, p: "trening indywidualny" },
    { id: 4, src: fitness, p: "motoryka" },
    { id: 5, src: goalkeeper, p: "trening bramkarski" },
  ];

  return (
    <div className={`categories-wrapper ${addClass}`}>
      {categoriesIcons.map((element, i) => (
        <div
          key={i}
          className={
            category === element.p ? `icon-wrapper color` : "icon-wrapper"
          }
          onClick={(e) => setCategory(e.currentTarget.lastChild.textContent)}
        >
          <img
            className={category === element.p ? `color` : ""}
            src={element.src}
          />
          <p className={category === element.p ? `color` : ""}>{element.p}</p>
        </div>
      ))}
      {/* <div
        className="icon-wrapper"
        onClick={(e) => {
          setCategory("technika");
        }}
      >
        <img src={technique} alt="" />
        <p>Technika</p>
      </div>
      <div
        className="icon-wrapper"
        onClick={(e) => {
          setClickedElement(
            e.currentTarget.lastChild.textContent.toLowerCase()
          );
          setCategory("taktyka");
        }}
      >
        <img
          className={` ${clickedElement === category && "color "}`}
          src={tactis}
          alt=""
        />

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
      </div> */}
    </div>
  );
};
