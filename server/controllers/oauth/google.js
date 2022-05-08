const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../../models");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
  post: async (req, res) => {
    try {
      const { idToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("googleLogin payload", payload);
      const email = payload.email + "-Google";
      const username = payload.name + String(Math.random()).slice(2, 8);
      // const password = process.env.SOCIAL_LOGIN_PASSWORD;
      const image = payload.picture;

      let userInfo = await User.findOne({ email });
      if (!userInfo) {
        userInfo = await User.create({ email, username, password: `${email}${username}`, image });
      }
      const accessToken = generateAccessToken(userInfo, "accessToken");
      const refreshToken = generaterefreshToken(userInfo, "refreshToken");
      sendTocookie(res, accessToken, refreshToken);

      return res.json({
        userInfo: userInfo,
        accessToken: accessToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
