import React, { useState, useContext, useRef, useEffect } from "react";
import "./posts.scss";
import { useLocation } from "react-router-dom";
import { Categories } from "../../components/Categories/Categories";
import { Post } from "../Post/Post";

import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { YouNeedToBeLogged } from "../YouNeedToBeLogged/YouNeedToBeLogged";

export const Posts = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isSearch, setIsSearch] = useState();
  const [title, setTitle] = useState(location.state && location.state.title);
  const [category, setCategory] = useState(
    location.state && location.state.category
  );
  const [howManyPlayers, setHowManyPlayers] = useState(
    location.state && location.state.howManyPlayers
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const titleRef = useRef();
  const authorRef = useRef();
  const [filters, setFilters] = useState([]);
  const searchRef = useRef();
  const handleFilters = (e) => {
    setIsSearch(false);
    const value = e.target.value.toLowerCase();
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (
      (location.state && location.state.title != "") ||
      (location.state && location.state.category != "") ||
      (location.state && location.state.howManyPlayers != "")
    ) {
      setIsSearch(true);
    }
  }, [location.state]);

  const { data, loading, error, reFetch } = useFetch(
    location.state
      ? `https://bibliotekatrenera.pl/api/posts?title=${title}&category=${category}&howManyPlayers=${howManyPlayers}`
      : category
      ? `https://bibliotekatrenera.pl/api/posts?category=${category}`
      : howManyPlayers
      ? `https://bibliotekatrenera.pl/api/posts?howManyPlayers=${howManyPlayers}`
      : `https://bibliotekatrenera.pl/api/posts`
  );

  const resetExercises = () => {
    titleRef.current.value = "";
    authorRef.current.value = "";
    setIsSearch(false);

    setTitle("");
    setCategory("");
    setHowManyPlayers("");
    setFilters(null);
    reFetch();
  };

  const handleClick = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
    reFetch();
  };

  return (
    <>
      {!user ? (
        <YouNeedToBeLogged />
      ) : (
        <>
          <Categories
            reFetch={reFetch}
            category={category}
            setCategory={setCategory}
            setFilters={setFilters}
          />

          <div className="posts">
            <div className="postsContainer">
              <div className="searchContainer">
                <h2 className="searchTitleH1">Wyszukaj ćwiczenie</h2>
                <div className="listItem">
                  <label htmlFor="title">{`Szukaj w tytule ${
                    category ? `dla kategorii - ${category}` : ""
                  }:`}</label>
                  <input
                    name="title"
                    type="text"
                    id="title"
                    placeholder={title}
                    ref={titleRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      handleFilters(e);
                    }}
                  />
                </div>

                <div className="listItem">
                  <div className="lsOptionItem">
                    <span className="optionText">Ilość zawodników</span>
                    <input
                      type="number"
                      min={1}
                      // onChange={(e) => setHowManyPlayers(e.target.value)}
                      name="howManyPlayers"
                      onChange={handleFilters}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <div className="subcat">
                      <p>Podkategorie:</p>
                      <select name="subCategory" onChange={handleFilters}>
                        <option disabled>Subkategorie</option>
                        <option>rozgrzewka</option>
                        <option>podania</option>
                        <option>przyjęcie piłki</option>
                        <option>prowadzenie piłki</option>
                        <option>drybling</option>
                        <option>strzały</option>
                        <option>małe gry</option>
                        <option>gry zadaniowe</option>
                        <option>taktyka w obronie</option>
                        <option>taktyka w ataku</option>
                        <option>SFG</option>
                      </select>
                    </div>
                  </div>

                  <div className="listItem">
                    <label htmlFor="coach">Autor ćwiczenia:</label>
                    <input
                      name="author"
                      type="text"
                      id="coach"
                      ref={authorRef}
                      onChange={handleFilters}
                    />
                  </div>
                </div>
                <button className="searchButtonPosts" onClick={handleClick}>
                  szukaj
                </button>
                <button className="resetButtonPosts" onClick={resetExercises}>
                  pokaż wszystkie ćwiczenia{" "}
                </button>
              </div>
              <div className="containerForRightSection">
                {isSearch ? (
                  <>
                    <p
                      style={{
                        marginBottom: "30px",
                        marginLeft: "50px",
                        fontFamily: "Josefin Sans",
                      }}
                    >
                      Wyniki wyszukiwania dla:
                      <span className="spanInfoAboutSearchOptions">
                        {title ? `tytuł: ${title}` : null}
                      </span>
                      <span className="spanInfoAboutSearchOptions">
                        {category ? `kategoria: ${category}` : null}
                      </span>
                      <span className="spanInfoAboutSearchOptions">
                        {howManyPlayers
                          ? `ilość zawodników: ${howManyPlayers}`
                          : null}
                      </span>
                    </p>
                    <button
                      className="resetStateButton"
                      onClick={resetExercises}
                    >
                      wyczyść wyszukiwanie
                    </button>{" "}
                  </>
                ) : null}

                <div ref={searchRef} className="resultsContainer">
                  {filters
                    ? data
                        .filter((item) =>
                          Object.entries(filters).every(([key, value]) =>
                            item[key].toLowerCase().includes(value)
                          )
                        )
                        .map((post) => <Post post={post} key={post._id} />)
                    : data.map((post) => <Post post={post} key={post._id} />)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
