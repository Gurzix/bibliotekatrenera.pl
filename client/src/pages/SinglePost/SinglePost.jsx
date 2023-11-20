import React, { useState, useEffect } from "react";
import "./singlePost.scss";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data } = useFetch(`http://45.93.139.98/api/posts/${path}`);

  const [images, setImages] = useState();

  useEffect(() => {
    setImages(data.img);
  }, [data.img]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [selectedImg, setSelectedImg] = useState("");

  const handleImg = (e) => {
    window.open(e.target.src);
  };

  return (
    <div className="singlePost">
      <div className="leftSide">
        <div className="images">
          {images?.length > 1 ? (
            <>
              <img src={images[0]} onClick={(e) => setSelectedImg(0)} alt="" />
              <img
                src={images[1]}
                onClick={(e) => setSelectedImg(1)}
                alt=""
              />{" "}
            </>
          ) : null}
        </div>
        <div className="mainImg">
          <img
            onClick={handleImg}
            src={
              images ? (selectedImg ? images[selectedImg] : images[0]) : null
            }
            alt=""
          />
        </div>
      </div>
      <div className="rightSide">
        <h1>{data.title}</h1>

        <div className="wrapperFilters">
          <div className="wrapperForSinglePostIcon">
            <DriveFileRenameOutlineIcon className="iconFilters" />
            <p className="filter">{data.author}</p>
          </div>
          <div className="wrapperForSinglePostIcon">
            <SportsSoccerIcon className="iconFilters" />
            <p className="filter">
              {data.categories ? data.categories[0] : null}
            </p>
            <p className="filter">
              {data.categories ? data.categories[1] : null}
            </p>
          </div>
          <div className="wrapperForSinglePostIcon">
            <PersonIcon className="iconFilters" />
            <p className="filter">{data.howManyPlayers}</p>
          </div>
        </div>

        <div className="descWrapper">
          <h3>Przebieg ćwiczenia:</h3>
          <p className="desc">{data.desc}</p>
          {data.coachingPoints ? (
            <>
              {" "}
              <h3>Coaching points:</h3>
              <p className="coachingPoints desc">{data.coachingPoints}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
