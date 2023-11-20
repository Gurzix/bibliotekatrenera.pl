const nodemailer = require("nodemailer");

// forgot password controller

const sendMessage = async (req, res) => {
  const { email, text, name } = req.body;
  try {
    // sending email

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    var mailOptions = {
      from: email,
      to: "bibliotekadlatrenera@gmail.com",
      subject: `Zapytanie od ${email}`,
      text: `Użytkownik o imieniu ${name} i adresie email: ${email} wysyła następujące zapytanie: ${text}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(email);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendMessage,
};
