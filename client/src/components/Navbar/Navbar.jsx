import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HomeIcon from "@mui/icons-material/Home";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("login");
    setIsActive((prev) => !prev);
  };
  const changeMenu = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <>
      <GrClose
        className={` ${isActive ? "hamburgerOpenIcon" : "hide"}`}
        onClick={changeMenu}
      />
      <GiHamburgerMenu
        className={` ${!isActive ? "hamburgerCloseIcon" : "hide"}`}
        onClick={changeMenu}
      />

      {isActive ? (
        <div className="hamburgerMenu">
          <div className="menuContainer">
            <Link onClick={changeMenu} to="/" className="link">
              Strona główna
            </Link>
            <Link onClick={changeMenu} className="link" to="about">
              Poznaj nas
            </Link>
            <Link onClick={changeMenu} className="link" to="posts">
              Trening
            </Link>
            <Link onClick={changeMenu} className="link" to="contact">
              Kontakt
            </Link>
            {!user ? (
              <>
                <div className="item">
                  <Link
                    onClick={changeMenu}
                    className="link"
                    to="register"
                    style={{ color: "#9f0900" }}
                  >
                    Zarejestruj się
                  </Link>
                </div>
                <div className="item">
                  <Link
                    onClick={changeMenu}
                    className="link"
                    to="login"
                    style={{ color: "#016312" }}
                  >
                    Zaloguj się
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span
                  style={{
                    fontStyle: "italic",
                    textDecoration: "underline",
                    textDecorationStyle: "wavy",
                    textDecorationColor: "darkgreen",
                  }}
                >
                  Zalogowano jako
                  <span style={{ color: "darkgreen" }}>
                    {" "}
                    {user ? user.username : null}{" "}
                  </span>
                </span>
                <div className="item">
                  <Link
                    onClick={handleLogout}
                    className="link"
                    to="logout"
                    style={{ color: "crimson" }}
                  >
                    Wyloguj się
                  </Link>
                </div>
                <div className="item">
                  {user.username === "admin" ? (
                    <Link
                      to="addPost"
                      className="link"
                      style={{ color: "#8000ff" }}
                      onClick={changeMenu}
                    >
                      Dodaj post
                    </Link>
                  ) : null}
                </div>
              </>
            )}
          </div>
          <div className="icons">
            <Link to="https://twitter.com/Football8Drills" className="link">
              <TwitterIcon className="twitter" />
            </Link>
            <Link to="/" className="link">
              <InstagramIcon className="instagram" />
            </Link>

            <Link to="/" className="link">
              <YouTubeIcon className="youtube" />
            </Link>
          </div>
        </div>
      ) : null}
      <div className="navbar navbarSticky">
        <div className="wrapper">
          <div className="left">
            <div className="icons">
              <Link to="/" className="link">
                <TwitterIcon className="twitter" />
              </Link>
              <Link to="/" className="link">
                <InstagramIcon className="instagram" />
              </Link>

              <Link to="/" className="link">
                <YouTubeIcon className="youtube" />
              </Link>
            </div>
          </div>
          <div className="center">
            <div className="item homeIcon">
              <Link className="link" to="/">
                <HomeIcon />
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="about">
                Poznaj nas
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="posts">
                Trening
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="contact">
                Kontakt
              </Link>
            </div>
          </div>
          <div className="right">
            {!user ? (
              <>
                <div className="item">
                  <Link
                    className="link"
                    to="register"
                    style={{ color: "#9f0900" }}
                  >
                    Zarejestruj się
                  </Link>
                </div>
                <div className="item">
                  <Link
                    className="link"
                    to="login"
                    style={{ color: "#016312" }}
                  >
                    Zaloguj się
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span
                  style={{
                    fontStyle: "italic",
                    textDecoration: "underline",
                    textDecorationStyle: "wavy",
                    textDecorationColor: "darkgreen",
                  }}
                >
                  Zalogowano jako
                  <span style={{ color: "darkgreen" }}>
                    {" "}
                    {user ? user.username : null}{" "}
                  </span>
                </span>
                <div className="item">
                  <Link
                    onClick={handleLogout}
                    className="link"
                    to="logout"
                    style={{ color: "crimson" }}
                  >
                    Wyloguj się
                  </Link>
                </div>
                <div className="item">
                  {user.username === "admin" ? (
                    <Link
                      to="addPost"
                      className="link"
                      style={{ color: "#8000ff" }}
                    >
                      Dodaj post
                    </Link>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
