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
  kakaoWithdrawal: async (kakaoId) => {
    const kakaoAdmin = process.env.KAKAO_ADMIN_KEY;
    console.log(kakaoId);

    await axios(
      `https://kapi.kakao.com/v1/user/unlink?target_id_type=user_id&target_id=${kakaoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `KakaoAK ${kakaoAdmin}`,
        },
      }
    );
  },
};
