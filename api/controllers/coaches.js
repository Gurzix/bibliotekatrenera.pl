const Coach = require("../models/Coach");
const Post = require("../models/Post");

const addCoach = async (req, res) => {
  const newCoach = new Coach(req.body);
  try {
    const savedCoach = await newCoach.save();
    res.status(200).json(savedCoach);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostsByCoach = async (req, res) => {
  const { name } = req.query;

  try {
    let posts;

    posts = await Post.find({
      author: { $regex: new RegExp(name), $options: "i" },
    });
    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
};

const findCoach = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    res.status(200).json(coach);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findCoachByHisName = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const coach = await Coach.findOne({
        name,
      });
      res.status(200);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const allCoaches = async (req, res) => {
  try {
    const coach = await Coach.find();
    res.status(200).json(coach);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  findCoach,
  findCoachByHisName,
  getPostsByCoach,
  addCoach,
  allCoaches,
};
