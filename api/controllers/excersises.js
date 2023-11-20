const Post = require("../models/Post");

const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFeatured = async (req, res) => {
  const { featured, limit } = req.query;
  try {
    const posts = await Post.find({ featured: featured }).limit(limit);

    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
};
const getPosts = async (req, res) => {
  const { title, category, howManyPlayers, author, featured } = req.query;

  console.log(req.query);

  try {
    let posts;

    if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
        title: { $regex: new RegExp(title), $options: "i" },
        howManyPlayers: { $regex: new RegExp(howManyPlayers) },
      });
    } else if (title) {
      posts = await Post.find({
        title: { $regex: new RegExp(title), $options: "i" },
      });
    } else if (howManyPlayers) {
      posts = await Post.find({
        howManyPlayers: { $regex: new RegExp(howManyPlayers) },
      });
    } else if (featured) {
      posts = await Post.find({ featured: { $in: true } });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  getFeatured,
};