import React from "react";
import img from "./logo.svg";
import "./navbarImage.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export const NavbarImage = () => {
  const [hideNavbar, setHideNavbar] = useState("navbarImage");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setHideNavbar("hideNavbarImg");
    } else {
      setHideNavbar("navbarImage");
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
    <motion.img
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.7, delay: 0.25 }}
      className={hideNavbar}
      src={img}
      alt=""
    />
  );
};
