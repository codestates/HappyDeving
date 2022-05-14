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
    let postData = "token=" + googleaccessToken;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClinentSecret = process.env.GOOGLE_CLIENT_SECRET;
    const googleinfo = await axios({
      host: "oauth2.googleapis.com",
      port: "443",
      path: `/revoke${googleaccessToken}`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(googleinfo);
  },
};
