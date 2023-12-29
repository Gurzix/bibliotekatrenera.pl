import React, { useState, useEffect } from "react";
import "./singlePost.scss";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import axios from "axios";
export const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data } = useFetch(`https://bibliotekatrenera.pl/api/posts/${path}`);
  const [images, setImages] = useState();
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    setImages(data.img);
  }, [data.img]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://bibliotekatrenera.pl/api/coaches"
      );
      setCoaches(result);
    }
    fetchData();
  }, []);

  // console.log(coaches.data?.filter((p) => p.name === data.author)[0]._id);
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

          <div className="wrapperFilters">
            <div className="wrapperForSinglePostIcon">
              <DriveFileRenameOutlineIcon className="iconFilters" />
              <p className="filter">
                <Link
                  to={`/about/${
                    coaches.data?.filter((p) => p.name === data?.author)[0]._id
                  }`}
                >
                  {data.author}
                </Link>
              </p>
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
