require("dotenv").config();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const axios = require("axios");
const fetch = require("node-fetch");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      return res.status.json("naver get ok");
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
      const naverClientId = process.env.NAVER_CLIENT_ID;
      const naverClientSecret = process.env.NAVER_CLIENT_SECRET;
      const state = process.env.NAVER_STATE;
      const resp = await axios({
        method: "GET",
        url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverClientId}&client_secret=${naverClientSecret}&code=${authorizationCode}&state=${state}`,
      });

      const { access_token } = resp.data;

      // console.log(access_token);

      const naverInfo = await axios({
        method: "GET",
        url: `https://openapi.naver.com/v1/nid/me`,
        headers: {
          "Content-Type": "text/json;charset=utf-8",
          Authorization: `bearer ${access_token}`,
        },
      });
      const { id, nickname, profile_image: image, email } = naverInfo.data.response;
      console.log("id===", typeof id, "nickname", nickname, "image", image, "email", email);

      const password = `${id}${nickname}`;
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userInfo = await User.findOne({
        where: { email },
      });

      if (!userInfo) {
        const newUser = await User.create({
          username: nickname,
          image,
          password: hashedPassword,
          email,
          verified: true,
          loginMethod: 4,
        });

        const newAccessToken = generateAccessToken(newUser.dataValues);
        const newrefreshToken = generaterefreshToken(newUser.dataValues);
        sendTocookie(res, access_token, newrefreshToken);
        return res.status(201).json({
          user: newUser,
          accessToken: newAccessToken,
        });
      }

      const newAccessToken = generateAccessToken(userInfo.dataValues);
      const newrefreshToken = generaterefreshToken(userInfo.dataValues);
      sendTocookie(res, access_token, newrefreshToken);

      return res.status(200).json({
        user: userInfo,
        accessToken: newAccessToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
