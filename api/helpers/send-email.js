const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const _ = require("lodash");

module.exports = {
  inputs: {
    user: {
      type: "ref",
    },
  },

  fn: async function (inputs) {
    const oauth2Client = new OAuth2(
      sails.config.clientId,
      sails.config.clientSecret,
      sails.config.redirectUrl // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: sails.config.refreshToken,
    });
    const accessToken = await oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: sails.config.emailUser,
        clientId: sails.config.clientId,
        clientSecret: sails.config.clientSecret,
        refreshToken: sails.config.refreshToken,
        accessToken: accessToken,
      },
    });

    console.log(" user received ==> ", inputs.user);
    const mailOptions = {
      from: sails.config.emailUser,
      to: inputs.user.email,
      subject: "Appointment alert",
      generateTextFromHTML: true,
      html: "<b>Appoinment has been booked</b>",
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      console.error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  },
};
