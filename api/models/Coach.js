const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    license: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    club: {
      type: String,
      required: false,
    },
    formerClubs: {
      type: Array,
      required: false,
    },
    languagesSpoken: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", CoachSchema);
