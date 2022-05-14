const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  sendTocookie,
  generaterefreshToken,
} = require("../tokenFunctions");

const sendEmail = require("../../utils/sendEmail");

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      // 요청이 잘못된 경우 다음을 리턴
      if (!email || !password || !username) {
        return res.status(400).json({ message: `Bad Request!` });
      }

      const userInfo = await User.findOne({ where: { email } });

      if (userInfo) {
        return res.status(409).json({ message: "user already exists" });
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        loginMethod: 0,
      });

      // console.log("newUser.verified::", newUser.verified);
      const newAccessToken = generateAccessToken({ username, email });
      const newrefreshToken = generaterefreshToken({ username, email });
      sendTocookie(res, newAccessToken, newrefreshToken);

      if (!newUser.verified) {
        const url = `${process.env.BASE_URL}/users/${newUser.id}/verify/${newAccessToken}`;
        await sendEmail(newUser, "해피데빙 인증메일", url);
      }

      return res.status(201).json({
        newUser,
        accessToken: newAccessToken,
        message: "An Email sent to your account please verify",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  get: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) return res.status(400).send("유효하지 않은 접근입니다.");

      console.log(req.params);

      if (!req.params.token) {
        return res.status(400).send("유효하지 않은 접근입니다.");
      }

      await User.update(
        { verified: true },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).send("이메일 인증이 성공하였습니다.");
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
