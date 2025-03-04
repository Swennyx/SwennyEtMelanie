// pre config de mailer pour reset le mot de pass de l'utilisateur
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tonemail@gmail.com",
    pass: "tonmotdepasseouappPassword",
  },
});

module.exports = transporter;
