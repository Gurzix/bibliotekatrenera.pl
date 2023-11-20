import React, { useEffect } from "react";
import "./coachInfo.scss";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
export const CoachInfo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { data } = useFetch(`http://45.93.139.98/api/coaches/${path}`);
  console.log(data);

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
              <span>25 ćwiczeń</span>
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
        </div>
      </div>
    </div>
  );
};
