const { checkAccessToken } = require("../tokenFunctions");
const { withdrawal } = require("../../middleware/withdrawal");
const { kakaoWithdrawal } = require("../../middleware/kakaoWithdrawal");
const { googleWithdrawal } = require("../../middleware/googleWithdrawal");
const { githubWithdrawal } = require("../../middleware/githubWithdrawal");
const { naverWithdrawal } = require("../../middleware/naverWithdrawal");

const {
  User,
  Study_comment,
  Study,
  Language,
  Study_language,
  Location,
  User_likes_study,
} = require("../../models");

module.exports = {
  delete: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { id: paramsId } = req.params;

      // if (data.id !== Number(paramsId)) {
      //   return res.status(401).json("wrong req params");
      // }

      // const { loginMethod } = req.body;

      const userInfo = await User.findOne({
        // attributes: ["id", "loginMethod"],
        // include: [
        //   {
        //     model: Study,
        //     as: "study",
        //     include: [{ model: Location, as: "location" }],
        //   },
        //   { model: Study_comment, as: "study_comment" },
        //   { model: User_likes_study, as: "user_likes_study" },
        // ],
        where: { id: paramsId },
      });

      if (!userInfo) {
        return res.status(404).json("already withdrawal");
      }

      const { id, loginMethod, email } = userInfo.dataValues;
      // return res.json("ok");

      // const { authorization } = req.cookie;
      // console.log("cookies", req.cookies.accessToken);
      // const accessToken = authorization.split(" ")[1];
      const { accessToken } = req.cookies;

      if (loginMethod === 0) {
        withdrawal(id);
      }
      if (loginMethod === 1) {
        githubWithdrawal(accessToken);
      }
      if (loginMethod === 2) {
        googleWithdrawal(accessToken);
        // withdrawal(id);
      }
      // return res.json("ok");
      // return res.json("ok");
      // if (loginMethod === 3) {
      //   kakaoWithdrawal(accessToken);
      //   withdrawal(id);
      // }
      // if (loginMethod === 4) {
      //   naverWithdrawal(accessToken);
      //   withdrawal(id);
      // }

      // console.log(accessToken);
      res.cookie("accessToken", null, { maxAge: 0 });
      res.cookie("refreshToken", null, { maxAge: 0 });

      return res.status(200).json("withdrawal done");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
