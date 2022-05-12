require("dotenv").config();
const axios = require("axios");
const fetch = require("node-fetch");
const {
  User,
  Study_comment,
  Study,
  Language,
  Study_language,
  Location,
  User_likes_study,
} = require("../models");

module.exports = {
  googleWithdrawal: async (accessToken) => {
    // const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    console.log(accessToken);
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClinentSecret = process.env.GOOGLE_CLIENT_SECRET;
    const googleinfo = await axios({
      method: "POST",
      url: ` https://oauth2.googleapis.com/revoke?token=${accessToken}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(googleinfo);
  },
};
