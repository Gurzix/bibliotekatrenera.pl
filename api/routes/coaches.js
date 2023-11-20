const express = require("express");
const router = express.Router();

const {
  addCoach,
  getPostsByCoach,
  findCoach,
  allCoaches,
} = require("../controllers/coaches");

router.post("/", addCoach);
// router.get("/", getPostsByCoach);
router.get("/:id", findCoach);
router.get("/", allCoaches);
module.exports = router;
