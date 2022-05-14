require("dotenv").config();
const { User } = require("../../models");
const axios = require("axios");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  sendTocookie,
  generaterefreshToken,
} = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    try {
      const { authorizationCode } = req.body;

      if (!authorizationCode) {
        return res.status(400).json("bad request");
      }

      const clientID = process.env.GIT_CLIENT_ID;
      const clientSecret = "1a8136a24d7a2f9c517704ac7f108d76dae37c4b";
      const resp = await axios({
        method: "POST",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${authorizationCode}`,
        headers: {
          accept: "application/json",
        },
      });

      const { access_token } = resp.data;

      let response = await axios.get("https://api.github.com/user", {
        headers: {
          authorization: `bearer ${access_token}`,
          "content-type": "application/json",
        },
      });

      const {
        id,
        login: nickname,
        html_url,
        blog,
        avatar_url: image,
      } = response.data;
      let { email } = response.data;
      const password = `${id}${nickname}`;
      if (email === null) {
        email = `${id}${nickname}@github.com`;
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userInfo = await User.findOne({
        where: { email },
      });
      if (!userInfo) {
        const newUser = await User.create({
          username: nickname,
          email,
          verified: true,
          password: hashedPassword,
          github: html_url,
          blog,
          image,
          loginMethod: 1,
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
