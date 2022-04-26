const { User, Study_comment, Study, Language } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      const data = checkAccessToken(req);
      // console.log(data);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { id: paramsId } = req.params;

      const users = await User.findOne({
        where: {
          id: paramsId,
        },
        // include: [
        //   { model: Study, as: "study" },
        //   { model: Study_comment, as: "study_comment" },
        // ],
      });

      const findStudy = await Study.findAll({
        where: { user_id: paramsId },
        include: ["study_language"],
      });

      // console.log(findStudy[0].dataValues);

      // findStudy.forEach(el => el.)

      // const comment = await Study_comment.findAll({
      //   where: { user_id: paramsId },
      // });

      // const findLanguage = await Language.findAll({
      //   where: { study_id: findStudyId },
      // });

      // console.log(findLanguage);

      const { id, username, email, verified, createdAt, updatedAt } = users.dataValues;

      // let study = [];
      // for (let i = 0; i < findStudy.length; i++) {
      //   const { username } = users.dataValues;
      //   const { id, title, content, kakaoLink, closed, location_id, createdAt, updatedAt } =
      //     findStudy[i].dataValues;

      //   study.push({
      //     id,
      //     username,
      //     content: { description: content, title },
      //     kakaoLink,
      //     closed,
      //     location_id,
      //     createdAt,
      //     updatedAt,
      //   });
      // }

      return res.json({
        data: {
          userInfo: { id, username, email, verified, createdAt, updatedAt },
          studies: findStudy,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: (req, res) => {
    try {
      res.send("mypage patch ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: (req, res) => {
    try {
      res.send("mypage delete ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
