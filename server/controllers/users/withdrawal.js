const { checkAccessToken } = require("../tokenFunctions");
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

      if (data.id !== Number(paramsId)) {
        return res.status(401).json("wrong req params");
      }

      const { loginMethod } = req.body;

      const userInfo = await User.findOne({
        attributes: ["id"],
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

      if (loginMethod === 0) {
        const studyList = await Study.findAll({
          where: { user_id: userInfo.id },
        });

        const study_commentList = await Study_comment.findAll({
          where: { user_id: userInfo.id },
        });

        const User_likes_studyList = await User_likes_study.findAll({
          where: { user_id: userInfo.id },
        });

        const studyIdList = [];
        await studyList.map((el) => studyIdList.push(el.id));

        const study_commentIdList = [];
        await study_commentList.forEach((el) => study_commentIdList.push(el.id));

        const User_likes_studyIdList = [];
        await User_likes_studyList.map((el) => User_likes_studyIdList.push(el.id));

        await Study_comment.destroy({
          where: { user_id: userInfo.id },
        });

        for (let i = 0; i < User_likes_studyIdList.length; i++) {
          await User_likes_study.destroy({
            where: { user_id: User_likes_studyIdList[i] },
          });
        }

        for (let i = 0; i < studyIdList.length; i++) {
          await Study_language.destroy({
            where: { study_id: studyIdList[i] },
          });
          await Study_comment.destroy({
            where: { study_id: studyIdList[i] },
          });
          await User_likes_study.destroy({
            where: { study_id: studyIdList[i] },
          });
          await Study.destroy({
            where: { id: studyIdList[i] },
          });
        }

        await User.destroy({
          where: { id: userInfo.id },
          include: [{ model: Study_comment, as: "study_comment" }],
        });
      }

      res.cookie("accessToken", null, { maxAge: 0 });
      res.cookie("refreshToken", null, { maxAge: 0 });

      return res.status(200).json("withdrawal done");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
