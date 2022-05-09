require("dotenv").config();
const { User } = require("../../models");
const axios = require("axios");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      res.redirect(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.CLIENT_ORIGIN}`
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  post: async (req, res) => {
    try {
      const { authorizationCode } = req.body;
      // console.log(authorizationCode);

      if (!authorizationCode) {
        return res.status(400).json("bad request");
      }

      const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
      const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
      const redirectUri = process.env.CLIENT_ORIGIN;
      // const grantType = "authorization_code";

      // authorizationCode로 kakao token 을 받아온다.
      const resp = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          client_secret: KAKAO_CLIENT_SECRET,
          redirect_uri: redirectUri,
          code: authorizationCode,
        }),
      }).then((res) => res.json());
      // const { access_token } = resp.data;
      // console.log(resp);

      const kakaoAccessToken = resp.access_token;
      // const kakaoRefreshToken = resp.refresh_token;
      const kakaoUserInfo = await fetch(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      }).then((res) => res.json());

      let { id } = kakaoUserInfo;
      const { nickname, thumbnail_image_url } = kakaoUserInfo.kakao_account.profile;
      id = String(id);
      const password = `${id}${nickname}`;
      const email = `${id}${nickname}@gmail.com`;

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userInfo = await User.findOne({
        where: { email: email },
      });
      const newAccessToken = generateAccessToken({ id, email });
      const newrefreshToken = generaterefreshToken({ id, email });

      if (userInfo) {
        sendTocookie(res, newAccessToken, newrefreshToken);

        return res.status(200).json({
          user: userInfo,
          accessToken: newAccessToken,
        });
      }

      const newUser = await User.create({
        username: nickname,
        image: thumbnail_image_url,
        password: hashedPassword,
        email: email,
        loginMethod: 4,
      });

      sendTocookie(res, newAccessToken, newrefreshToken);

      return res.status(201).json({
        userInfo: newUser,
        accessToken: newAccessToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
