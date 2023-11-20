import React from "react";
import "./footer.scss";

export const Footer = () => {
  let copyright = String.fromCodePoint(0x00a9);
  return <div className="footer">{`${copyright} Biblioteka Trenera 2023`}</div>;
};
