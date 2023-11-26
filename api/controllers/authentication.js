const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Joi = require("joi");

const userSchema = Joi.object().keys({
  email: Joi.string().email().required().label("Podaj poprawny adres email"),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required()
    .label(
      "Hasło nie spełnia wymogów - użyj małej i dużej litery, liczby i minimum 6 znaków"
    ),
});

const verifyEmail = async (email, token) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    var mailOptions = {
      from: "biblioteka trenera",
      to: email,
      subject: "Potwierdź swój email",
      text: `Aby w pełni korzystać z naszego serwisu , prosimy, potwierdź swój email klikająć w link :  ${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
// register controller

const register = async (req, res) => {
  try {
    const usernameInDatabaseCheck = await User.findOne({
      username: req.body.username,
    });
    usernameInDatabaseCheck &&
      res.status(400).json("Ten użytkownik widnieje w naszej bazie");
    const emailInDatabaseCheck = await User.findOne({ email: req.body.email });
    emailInDatabaseCheck &&
      res.status(400).json("Ten email widnieje w naszej bazie");

    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(JSON.stringify(result));
      res
        .status(400)
        .json(result.error.details.map((item) => item.context.label));
      console.log(result.error.details.map((item) => item));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(64).toString("hex"),
    });

    await token.save();
    const link = `https://bibliotekatrenera.pl/api/auth/confirmEmail/${token.token}`;
    await verifyEmail(user.email, link);
  } catch (err) {
    res.status(500).json(err);
  }
};

//login controller

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("nie znam takiego użytkownika");
    !user.isVerified && res.status(400).json("użytkownik nie zweryfikowany");
    const validated = await bcrypt.compare(req.body.password, user.password);

    !validated && res.status(400).json("podano błędne hasło");

    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
  }
};

// forgot password controller

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.send("User doesn't exist");
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "15m",
    });

    const link = `https://bibliotekatrenera.pl/api/auth/resetPassword/${oldUser.id}/${token}`;

    // sending email with link

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    var mailOptions = {
      from: "biblioteka trenera",
      to: "pgurzeda@gmail.com",
      subject: "Zmiana hasła",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    res.send("User doesn't exist");
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("resetPassword", { email: verify.email });
  } catch (err) {
    res.send("Not verified");
  }
};

const passwordChanged = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    res.send("User doesn't exist");
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.json({ status: "Password changed" });
  } catch (err) {
    res.json({ status: "Something went wrong" });
    console.log(err);
  }
};

const emailConfirmed = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    console.log(token);
    await User.updateOne({ _id: token.userId }, { $set: { isVerified: true } });
    await Token.findOneAndRemove(token.id);
    res.send("Email verified - you can play with our database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  resetPassword,
  register,
  login,
  forgotPassword,
  passwordChanged,
  emailConfirmed,
};
