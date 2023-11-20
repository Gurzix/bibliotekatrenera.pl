const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  passwordChanged,
  emailConfirmed,
} = require("../controllers/authentication.js");

// register

router.post("/register", register);

//LOGIN

router.post("/login", login);

// logout

router.post("/logout");

// forgot password

router.post("/forgotPassword", forgotPassword);

// reset password

router.get("/resetPassword/:id/:token", resetPassword);
router.post("/resetPassword/:id/:token", passwordChanged);
router.get("/confirmEmail/:token", emailConfirmed);
module.exports = router;
