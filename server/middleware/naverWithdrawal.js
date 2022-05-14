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
  naverWithdrawal: async (accessToken) => {
    const naverClientId = process.env.NAVER_CLIENT_ID;
    const naverClientSecret = process.env.NAVER_CLIENT_SECRET;
    const naverInfo = await axios({
      method: "GET",
      url: `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naverClientId}&client_secret=${naverClientSecret}&access_token=${accessToken}&service_provider=NAVER`,
      headers: {
        "Content-Type": "text/json;charset=utf-8",
        Authorization: `bearer ${accessToken}`,
      },
    });

    console.log(naverInfo);
  },
};
