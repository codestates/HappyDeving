const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../../models");
const { sendTocookie, generateAccessToken, generaterefreshToken } = require("../tokenFunctions");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require("bcrypt");

module.exports = {
  post: async (req, res) => {
    try {
      // console.log("req.body::", req.body);
      const id_token = req.body;
      // console.log("id_token::", id_token); // ok
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email, name, picture } = ticket.getPayload();

      let userInfo = await User.findOne({ where: { email } });

      if (!userInfo) {
        const password = `${email}gsecret`;
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        userInfo = await User.create({
          email,
          username: name,
          password: hashedPassword,
          image: picture,
          verified: true,
          loginMethod: 2,
        });
      }
      const accessToken = generateAccessToken(userInfo.dataValues, "accessToken");
      const refreshToken = generaterefreshToken(userInfo.dataValues);
      sendTocookie(res, id_token, refreshToken);

      return res.send({
        userInfo: userInfo.dataValues,
        accessToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
