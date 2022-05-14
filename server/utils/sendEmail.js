const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const getHtmlMessage = require("./getHtmlMessage.js");

module.exports = async (recipient, subject, url) => {
  try {
    console.log("refreshToken: ", process.env.GOOGLE_REFRESH_TOKEN);
    const accessToken = await OAuth2_client.getAccessToken();
    console.log("accessToken: ", accessToken);
    const mailerConfig = {
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_MAIL_PASSWORD,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
        expires: 1484314697598,
      },
    };
    console.log("mailerConfig: ", mailerConfig);
    const transporter = nodemailer.createTransport(mailerConfig);
    const emailOptions = {
      from: `HappyDeving <${process.env.GOOGLE_USER}>`,
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
