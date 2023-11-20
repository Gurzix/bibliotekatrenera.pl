import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./joinButton.scss";
import { AuthContext } from "../../context/AuthContext";

export const JoinButton = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Link to="/register" className="link">
        {user ? null : (
          <button className="joinButton">Dołącz, aby mieć pełen dostęp</button>
        )}
      </Link>
    </>
  );
};
