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

router.get("/", allCoaches);
router.get("/name", findCoachByHisName);
router.get("/:id", findCoach);
module.exports = router;
