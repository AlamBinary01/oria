const nodemailer = require('nodemailer');
const mailAddress= process.env.MAIL_USER
const mailPassword= process.env.MAIL_PASSWORD
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    // host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user:mailAddress ,
      pass:mailPassword ,
    },
  });

  module.exports= transporter