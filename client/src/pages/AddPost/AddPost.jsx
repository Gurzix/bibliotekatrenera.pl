import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addPost.scss";
import axios from "axios";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState();
  const [desc, setDesc] = useState("");
  const [howManyPlayers, setHowManyPlayers] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubcategory] = useState("");
  const [author, setAuthor] = useState("");
  const [coachingPoints, setCoachingPoints] = useState("");

  const navigate = useNavigate();

  const formData = new FormData();
  const sendPost = async (e) => {
    e.preventDefault();

    if (!files) {
      alert("please select image");
      return;
    }

    for (const file of files) {
      formData.append("file", file);
    }

    const res = await axios.post(
      "https://bibliotekatrenera.pl/api/upload",
      formData
    );

    const img = res.data.map((element) => element.location);
    console.log(img);
    const res2 = await axios.post("https://bibliotekatrenera.pl/api/posts", {
      coachingPoints,
      title,
      desc,
      howManyPlayers,
      categories,
      subCategory,
      author,
      img,
    });
    console.log(res2);
    navigate(`/posts/${res2.data._id}`);
  };
  return (
    <>
      <div className="addPost">
        <div className="left">
          {files ? (
            files[1] ? (
              <>
                <img
                  className="imgAddPost"
                  src={URL.createObjectURL(files[0])}
                  alt=""
                />
                <img
                  className="imgAddPost"
                  src={URL.createObjectURL(files[1])}
                  alt=""
                />
              </>
            ) : (
              <img
                className="imgAddPost"
                src={URL.createObjectURL(files[0])}
                alt=""
              />
            )
          ) : null}

          <div className="imgFileContainer">
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>

          {/* 
          <div className="imgFileContainer">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[1])}
              id="file"
            />
          </div> */}
        </div>
        <div className="right">
          <div className="inputContainer">
            <label htmlFor="title">Tytuł ćwiczenia:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="desc">Opis ćwiczenia:</label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
              id="desc"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="inputContainer">
            <label htmlFor="coachingPoints">Coaching points:</label>
            <textarea
              onChange={(e) => setCoachingPoints(e.target.value)}
              name="coachingPoints"
              id="coachingPoints"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="inputContainer">
            <label htmlFor="howManyPlayers">Liczba ćwiczących:</label>
            <input
              type="text"
              id="howManyPlayers"
              name="howManyPlayers"
              onChange={(e) => setHowManyPlayers(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="categories">Kategorie:</label>
            <input
              onChange={(e) => setCategories(e.target.value.split(" "))}
              type="text"
              id="categories"
              name="categories"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="subCategory">Podkategoria:</label>
            <input
              onChange={(e) => setSubcategory(e.target.value)}
              type="text"
              id="subCategory"
              name="subCategory"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="author">Autor ćwiczenia:</label>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              id="author"
              name="author"
            />
          </div>
        </div>
      </div>
      <div className="btnContainer">
        <button onClick={sendPost}>Wyślij</button>
      </div>
    </>
  );
};
