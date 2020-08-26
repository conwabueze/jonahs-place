const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter (Ther service that will actually send the email. Node does not actually save it itself)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_POR,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2) Define the email options
  const mailOptions = {
    from: 'Chino Nwabueze <hello@chino.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
