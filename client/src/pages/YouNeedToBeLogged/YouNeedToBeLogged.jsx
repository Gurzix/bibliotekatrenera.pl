import React from "react";
import "./youNeedToBeLogged.scss";

export const YouNeedToBeLogged = () => {
  return (
    <div className="youNeedToBeLoggedContainer">
      <div className="imgContainerYNTBL">
        <img
          className="imgYNTBL"
          src="https://biblioteka2.s3.eu-central-1.amazonaws.com/sign.png"
          alt=""
        />
      </div>
      <h2>Musisz być zalogowany żeby korzystać z bazy naszych ćwiczeń </h2>
    </div>
  );
};
