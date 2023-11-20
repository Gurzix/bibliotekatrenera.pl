const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getSinglePost,
  getFeatured,
} = require("../controllers/excersises");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/featured", getFeatured);
router.get("/:id", getSinglePost);

module.exports = router;
