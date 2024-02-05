import React from "react";
import "./post.scss";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const Post = ({ post }) => {
  return (
    <>
      <div className="post">
        <Link to={`/posts/${post._id}`}>
          <div className="imgContainer">
            <img src={post.img[0]} className="postImage" alt="" />
            <div className="titleCoveringContainer">
              <p>{post.title}</p>
            </div>
            <div className="howManyViewsContainer">
              <RemoveRedEyeIcon /> <span>{post.views}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
