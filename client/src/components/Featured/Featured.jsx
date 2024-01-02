import React from "react";
import "./featured.scss";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";

export const Featured = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    }
  }, [isInView]);

  const { data } = useFetch(
    `https://bibliotekatrenera.pl/api/posts/featured?featured=true&limit=3`
  );

  return (
    <>
      <h1 className="featuredH1">Najnowsze ćwiczenia:</h1>
      <motion.div
        className="featured"
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={control}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        {data.map((item) => (
          <Link to={`/posts/${item._id}`} key={item._id}>
            <div className="featuredItem">
              <img src={item.img[0]} alt="" className="featuredImg" />

              <div className="coveringTitleDiv">
                <p>{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </>
  );
};
