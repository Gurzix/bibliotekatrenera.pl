import React, { useState, useEffect } from "react";
import "./singlePost.scss";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
export const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data } = useFetch(`https://bibliotekatrenera.pl/api/posts/${path}`);
  const [coaches, setCoaches] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    setImages(data.img);
  }, [data.img]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function updatePost() {
      try {
        const result = await axios.put(
          `http://localhost:5000/api/posts/${path}`
        );
      } catch (err) {
        console.log(err);
      }
    }
    updatePost();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `https://bibliotekatrenera.pl/api/coaches`
      );
      setCoaches(result.data);
    }
    fetchData();
  }, []);

  const [selectedImg, setSelectedImg] = useState("");

  const handleImg = (e) => {
    window.open(e.target.src);
  };

  return (
    <div className="singlePostWrapper">
      <div className="singlePost">
        <div className="leftSide">
          <div className="images">
            {images?.length > 1 ? (
              <>
                <img
                  src={images[0]}
                  onClick={(e) => setSelectedImg(0)}
                  alt=""
                />
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
          {/* <p>
            <RemoveRedEyeIcon />
            <span>{data.views}</span>
          </p> */}

          <div className="wrapperFilters">
            <div className="wrapperForSinglePostIcon">
              <DriveFileRenameOutlineIcon className="iconFilters" />
              {coaches?.map(
                (coach) =>
                  coach.name === data.author && (
                    <p key={coach.name} className="filter">
                      <Link to={`/about/${coach._id}`}>{data.author}</Link>
                    </p>
                  )
              )}
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
    </div>
  );
};
