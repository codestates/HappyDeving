const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    try {
      const { email: bodyEmail, password } = req.body;

      // 요청이 잘못된 경우 다음을 리턴
      if (!bodyEmail || !password) {
        return res.status(400).json({ message: `Bad request!` });
      }

      const userInfo = await User.findOne({ where: { email: bodyEmail } });
      if (!userInfo) {
        return res.status(403).json({ message: `account not existed` });
      }

      const {
        id,
        username,
        email,
        password: userInfoPassword,
        createdAt,
        updatedAt,
      } = userInfo.dataValues;
      const check = await bcrypt.compare(password, userInfoPassword);

      if (!check) {
        return res.status(403).json({ message: `password not matched` });
      }

      // 회원 비밀번호 삭제 후 accessToken 발급
      // 민감한 정보 payload에 담으면 안됨
      // delete userInfo.dataValues.password;

      const newAccessToken = generateAccessToken({ id, username, email });
      const newrefreshToekn = generaterefreshToken({ id, username, email });
      sendTocookie(res, newrefreshToekn);

      res.status(200).json({
        data: { userInfo: { id, username, createdAt, updatedAt, loginMethod: 1 } },
        newAccessToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
