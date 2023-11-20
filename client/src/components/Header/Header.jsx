import React from "react";
import "./header.scss";
import img from "./header.webp";
import { NavbarImage } from "../NavbarImage/NavbarImage";

export const Header = () => {
  return (
    <div className="topDiv">
      <div className="header">
        <h2 className="headerH2">
          Setki ćwiczeń. Niewyczerpane źródło inspiracji.
        </h2>
        <img src={img} className="headerImg" alt="" />
      </div>
      <NavbarImage />
    </div>
  );
};
