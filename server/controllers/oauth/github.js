require("dotenv").config();
const { User } = require("../../models");
const axios = require("axios");
const fetch = require("node-fetch");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    try {
      const { authorizationCode } = req.body;
      console.log("server auth", authorizationCode);

      if (!authorizationCode) {
        return res.status(400).json("bad request");
      }

      const clientID = process.env.GIT_CLIENT_ID;
      const clientSecret = "1a8136a24d7a2f9c517704ac7f108d76dae37c4b";
      console.log(clientID, clientSecret);
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
          authorization: `token ${access_token}`,
          "content-type": "application/json",
        },
      });
      console.log(response);

      const { id, login, html_url, email, blog } = response.data;
      console.log(id, login, html_url, email, blog);

      const userInfo = await User.findOne({
        where: { password: `${id}${login}`, email: `${id}${login}@gmail.com` },
      });

      if (userInfo) {
        sendTocookie(res, access_token);

        return res.status(201).send({
          userInfo: userInfo,
          newAccessToken: access_token,
        });
      }

      const newUser = await User.create({
        username: login,
        // image: thumbnail_image_url,
        password: `${id}${login}`,
        email: email ? email : `${id}${login}@gmail.com`,
        blog: blog ? blog : null,
        loginMethod: 1,
      });

      sendTocookie(res, access_token);

      return res.status(201).send({
        newUser,
        accessToken: access_token,
      });
    } catch (err) {
      console.error("err", err);
      return res.status(500).json();
    }
  },
};
