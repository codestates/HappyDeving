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
    const googleaccessToken = process.env.GOOGLE_ACCESS_TOKEN;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClinentSecret = process.env.GOOGLE_CLIENT_SECRET;
    const googleinfo = await axios({
      url: `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
      port: "443",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    console.log(googleinfo);
  },
};
