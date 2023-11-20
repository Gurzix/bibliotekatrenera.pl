import React, { useEffect, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SportsIcon from "@mui/icons-material/Sports";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import "./about.scss";

export const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { data } = useFetch("http://45.93.139.98/api/coaches");

  return (
    <div className="about">
      {/* <h2 className="h2about">Nasza Filozofia</h2> */}
      <div className="topContent">
        <div className="imgContainerAbout">
          <img src="https://biblioteka-trenera.s3.eu-central-1.amazonaws.com/img+static/footballboots.jpg" />
        </div>
        <div className="paragraphContainer">
          <p className="paragraph">
            Bibliotekę Trenera stworzyliśmy z myślą o Trenerach ambitnych,
            pełnych pasji, zaangażowanych w rozwój swoich piłkarzy oraz siebie
            jako Trenerów. W Internecie można znaleźć mnóstwo środków
            treningowych, jednakże często są one powielane, bez założeń czy
            odpowiedniego wyjaśnienia. Korzystając z naszych ćwiczeń, możecie
            być pewni, że zostały one wcześniej sprawdzone na treningu i w razie
            potrzeby zmodyfikowane, poprawione oraz przedstawione Wam w
            najlepszej wersji. Ćwiczenia są dobrze opisane oraz skategoryzowane,
            co ułatwia ich wyszukiwanie. Każde z nich opatrzone jest w grafikę,
            którą można pobrać i umieścić w dowolnym programie do tworzenia
            konspektów. Biblioteka Trenera posiada również zbiór gotowych
            jednostek treningowych, które w niedługim czasie będą dostępne dla
            zarejestrowanych użytkowników.
          </p>
          <p className="paragraph">
            Większość z nas - ludzi, którzy budują Bibliotekę Trenera, przeszło
            podobną drogę. Zaczęło się od miłości do piłki nożnej i sportu.
            Trenowaliśmy, graliśmy mecze, poznawaliśmy wszystko od podszewki -
            szatnię, zależności i relacje międzyludzkie, smak zwycięstwa i
            gorycz porażki, sposoby treningowe, taktykę. Mieliśmy różnych
            Trenerów - lepszych, gorszych, zaangażowanych i takich, którym było
            wszystko jedno. Po latach gry na różnych poziomach w Polsce i za
            granicą, każdy z nas został Trenerem, zdając egzaminy i otrzymując
            licencję wydaną przez PZPN i UEFA. Mamy za sobą doświadczenie w
            pracy z młodzieżą oraz seniorami, a także liczne sukcesy - medale
            Mistrzostw Polski, awanse do wyższych klas rozgrywkowych czy
            wychowanków w Kadrach Polski w różnych kategoriach wiekowych.
          </p>
          <p className="paragraph">
            Mamy nadzieję pomóc wszystkim, którzy podobnie jak my na początku
            swojej kariery, szukają inspiracji, metod i środków, aby każdy
            trening przynosił oczekiwane rezultaty i poczucie dobrze wykonanej
            pracy. W naszej bazie znajdziecie środki treningowe tworzone przez
            nas, sprawdzone na naszych zespołach, jak również wiele ćwiczeń
            pochodzących ze staży , na które mieliśmy przyjemność i okazję
            jeździć. Strona jest ciągle w budowie. Jako, że jesteśmy czynnymi
            Trenerami, każdego dnia uzupełniamy bazę o nowe, unikatowe
            ćwiczenia.
          </p>
        </div>
      </div>
      {/* <h2 className="h2about">Nasi Trenerzy:</h2> */}
      {/* <div className="bottomContent">
        {data.map((coach) => (
          <div className="card" key={coach._id}>
            <img src={coach.img} alt="" className="fpImg" />

            <div className="textContainer">
              <div className="infoAboutCoach">
                <PermIdentityIcon className="icon" /> <span>{coach.name}</span>
              </div>
              <div className="infoAboutCoach">
                <SportsIcon className="icon" /> <span>{coach.club}</span>
              </div>
              <div className="infoAboutCoach">
                <ContactEmergencyIcon className="icon" />
                <span> {coach.license}</span>
              </div>
              <div className="infoAboutCoach">
                <SportsSoccerIcon
                  title="liczba ćwiczeń w Bibliotece Trenera"
                  className="icon"
                />
                <span> 25</span>
              </div>
            </div>
            <div className="buttonContainer">
              <Link to={`/about/${coach._id}`}>
                <button className="aboutCoachButton">Więcej o trenerze</button>
              </Link>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
