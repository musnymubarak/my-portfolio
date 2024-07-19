// mailer.js

const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "musnymohammed@gmail.com", // replace with your email address
    pass: "SangaMusny0826@", // replace with your email password or generate an app-specific password
  },
});

module.exports = transporter;
