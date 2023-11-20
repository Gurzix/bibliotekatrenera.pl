import React from "react";
import "./joinUs.scss";
import { motion, useInView, useAnimation } from "framer-motion";

import { useEffect, useRef } from "react";

export const JoinUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <div className="joinUs">
      <h1 className="joinUsH1">
        Chcesz razem z nami tworzyć Bibliotekę Trenera?
      </h1>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="flexContainer"
      >
        <div className="imgContainer">
          <img
            src="https://biblioteka-trenera.s3.eu-central-1.amazonaws.com/img+static/joinus2.png"
            alt=""
          />
        </div>
        <div className="textContainer">
          <p>
            Jeżeli Twoją pasją jest piłka nożna, lubisz dzielić się wiedzą i
            masz pomysł na ciekawe środki treningowe - nie zwlekaj! Odezwij się
            do nas, wyróżnij się i miej wpływ na tworzenie bazy danych, z której
            korzystają setki Trenerów!
          </p>
        </div>
      </motion.div>
    </div>
  );
};
