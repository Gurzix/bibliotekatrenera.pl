import "./imageSlider.scss";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const sliderStyles = { height: "100%", position: "relative" };

  const slideStyles = {
    backgroundImage: `url(${slides[currentIndex].url})`,
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "10px",
  };

  return (
    <div style={sliderStyles}>
      <ArrowBackIosIcon className="leftArrow" />
      <ArrowForwardIosIcon className="rightArrow" />
      <div style={slideStyles}></div>
    </div>
  );
};
