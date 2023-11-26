const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: false,
    },
    howManyPlayers: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    coachingPoints: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    featured: {
      type: String,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
