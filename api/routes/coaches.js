const express = require("express");
const router = express.Router();

const {
  addCoach,
  getPostsByCoach,
  findCoach,
  findCoachByHisName,
  allCoaches,
} = require("../controllers/coaches");

router.post("/", addCoach);
// router.get("/", getPostsByCoach);
router.get("/name", findCoachByHisName);
router.get("/:name", findCoach);
router.get("/", allCoaches);
module.exports = router;
