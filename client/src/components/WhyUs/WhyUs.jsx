import React from "react";
import "./whyUs.scss";
// import img from "./members.webp";
// import img from "./exercises.webp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { motion, useInView, useAnimation } from "framer-motion";

import { useState, useEffect, useRef } from "react";

export const WhyUs = () => {
  const data = [
    {
      id: 1,
      text: `  Baza ćwiczeń jest tworzona przez trenerów. Liczba korzystających z Biblioteki z dnia na dzień wzrasta, co świadczy o coraz
    większej popularności naszego serwisu i zaufaniu jakim darzą nas
    jego członkowie.`,
      img: "https://biblioteka-trenera.s3.eu-central-1.amazonaws.com/img+static/members.webp",
    },
    {
      id: 2,
      text: `Nasze ćwiczenia są zawsze sprawdzane na boisku i modyfikowane przed umieszczeniem w Bibliotece Trenera. Dzięki temu eliminujemy błędy powstałe w procesie planowania. `,
      img: "https://biblioteka-trenera.s3.eu-central-1.amazonaws.com/img+static/exercises.webp",
    },
    {
      id: 3,
      text: `Współpracujący z nami Trenerzy to doświadczeni szkoleniowcy, mający za sobą kilkanaście lat pracy w zawodzie oraz doświadczenie na wielu poziomach rozgrywkowych. W naszej bazie danych znajdują się ćwiczenia dostosowane dla zawodników o różnym poziomie zaawansowania.`,
      img: "https://biblioteka-trenera.s3.eu-central-1.amazonaws.com/img+static/coach.png",
    },
  ];

  const [count, setCount] = useState(0);

  const increment = () => {
    if (count === 2) {
      setCount(0);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count === 0) {
      setCount(2);
    } else {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const goToSlide = (itemIndex) => {
    setCount(itemIndex);
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <>
      <h1 className="whyUsH1">
        Dlaczego warto korzystać z Biblioteki Trenera?
      </h1>

      <div ref={ref} className="whyUs">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="carousel"
        >
          <ArrowCircleLeftIcon className="arrowLeft" onClick={decrement} />
          <ArrowCircleRightIcon className="arrowRight" onClick={increment} />
          <div className="box">
            <div className="imgContainer">
              <img src={data[count].img} className="img" alt="" />
            </div>
            <div className="textContainer">{data[count].text}</div>
          </div>
        </motion.div>
        <div className="dots">
          {data.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`${count === itemIndex ? "active" : "singleDot"}`}
              onClick={() => goToSlide(itemIndex)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
