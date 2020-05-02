const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const _ = require("lodash");

module.exports = {
  inputs: {
    userEmail: {
      type: "string",
    },
    body: {
      type: "string",
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

    const mailOptions = {
      from: sails.config.emailUser,
      to: inputs.userEmail,
      subject: "Appointment alert",
      generateTextFromHTML: true,
      html: `<b>${inputs.body}</b>`,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      console.error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  },
};
