import "./messageWasSent.scss";
import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useLocation } from "react-router-dom";

export const MessageWasSent = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className="sentMessageContainer">
      <MarkEmailReadIcon className="sentMessageIcon" />
      <p className="messageWasSentP">
        Dziękujemy{" "}
        <span className="spanSenderName">{location?.state.name}</span>, Twoja
        wiadomość została wysłana.
      </p>
    </div>
  );
};
