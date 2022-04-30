const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.googleClientId, config.googleClientSecret);
OAuth2_client.setCredentials({ refresh_token: config.googleRefreshToken });
const getHtmlMessage = require("./getHtmlMessage.js");

module.exports = async (recipient, subject, url) => {
  try {
    console.log("refreshToken: ", config.googleRefreshToken);
    const accessToken = await OAuth2_client.getAccessToken();
    console.log("accessToken: ", accessToken);
    const mailerConfig = {
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        type: "OAuth2",
        user: config.googleUser,
        pass: config.googlePassword,
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        refreshToken: config.googleRefreshToken,
        accessToken: accessToken.token,
      },
    };
    console.log("mailerConfig: ", mailerConfig);
    const transporter = nodemailer.createTransport(mailerConfig);
    const emailOptions = {
      //`HappyDeving <${config.USER}>`
      from: config.googleUser,
      to: recipient.email,
      subject: subject,
      html: getHtmlMessage(recipient.username, url),
    };
    console.log("emailOptions: ", emailOptions);
    await transporter.sendMail(emailOptions, function (error, result) {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Success: ", result);
      }
      transporter.close();
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
