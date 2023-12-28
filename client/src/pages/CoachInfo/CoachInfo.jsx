import React, { useEffect, useState, useContext } from "react";
import "./coachInfo.scss";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export const CoachInfo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const { data } = useFetch(`https://bibliotekatrenera.pl/api/coaches/${path}`);
  const coachPosts = posts.filter((post) => post.author === data.name);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("https://bibliotekatrenera.pl/api/posts");
      setPosts(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="wrapperCoachInfo">
      <div className="container">
        <div className="left">
          <div className="imgContainer">
            <img src={data.img} alt="" />
          </div>
          <div className="info">
            <div title="obecny klub" className="infoAboutCoach">
              <SportsIcon className="icon" /> <span>{data.club}</span>
            </div>
            <div
              title="posiadana licencja trenerska"
              className="infoAboutCoach"
            >
              <ContactEmergencyIcon className="icon" />
              <span>Trener {data.license}</span>
            </div>
            <div
              title="liczba ćwiczeń dodanych do Biblioteki Trenera"
              className="infoAboutCoach"
            >
              <SportsSoccerIcon className="icon" />
              <span>{coachPosts.length}</span>
            </div>
            <div title="znane języki" className="infoAboutCoach">
              <RecordVoiceOverIcon className="icon" />
              <span>{data.languagesSpoken}</span>
            </div>
            <div
              title="poprzednie kluby w roli trenera"
              className="infoAboutCoach"
            >
              <FastRewindIcon className="icon" />
              <span style={{ lineHeight: "1.7" }}>{data.formerClubs}</span>
            </div>
          </div>
        </div>

        <div className="textContainer">
          <div className="items">
            <h2>{data.name}</h2>
            <div className="item">
              <p>{data.desc}</p>
            </div>
          </div>
          <h4>Ćwiczenia dodane przez Trenera:</h4>
          {coachPosts.map((post) => (
            <div key={post._id} className="containerForTitles">
              <SportsSoccerIcon className="exTitleIcon" />
              {user ? (
                <Link className="link" to={`/posts/${post._id}`}>
                  <span className="coachExTitles" key={post.title}>
                    {post.title}
                  </span>
                </Link>
              ) : (
                <p className="notLoggedTitles" key={post.title}>
                  {post.title}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
