const { User, Study_comment, Study, Language, Location } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

module.exports = {
  // ! 완료
  get: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { id: paramsId } = req.params;

      console.log("data-----", typeof data.id);
      if (data.id !== Number(paramsId)) {
        return res.status(401).json("wrong req params");
      }

      const users = await User.findOne({
        where: {
          id: paramsId,
        },
        attributes: ["id", "username", "email", "verified", "createdAt", "updatedAt"],
        include: [
          {
            model: Study,
            as: "study",
            attributes: [
              "id",
              "content",
              "location_id",
              "title",
              "kakaoLink",
              "closed",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: Language,
                as: "language",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: Study_comment,
            as: "study_comment",
            attributes: ["id", "content", "createdAt", "updatedAt", "parentId"],
          },
        ],
      });

      for (let i = 0; i < users.study.length; i++) {
        const { username } = users;
        let { location_id } = users.study[i];
        console.log(location_id);
        let location = await Location.findOne({
          attributes: ["latitude", "longitude"],
        });
        if (users.study[i]) {
          users.study[i].dataValues.location = location;
        }
        users.study[i].dataValues.username = username;
        if (users.study_comment[i]) {
          users.study_comment[i].dataValues.username = username;
        }
      }

      const { id, username, email, verified, createdAt, updatedAt, study, study_comment } = users;

      return res.json({
        data: {
          userInfo: { id, username, email, verified, createdAt, updatedAt },
          studies: study,
          comments: study_comment,
        },
      });

      // const findStudy = await Study.findAll({
      //   where: { study_id: paramsId },
      //   include: ["language"],
      // });

      // console.log(findStudy);

      // console.log(findStudy[0].dataValues);

      // findStudy.forEach(el => el.)

      // const comment = await Study_comment.findAll({
      //   where: { user_id: paramsId },
      // });

      // const findLanguage = await Language.findAll({
      //   where: { study_id: findStudyId },
      // });

      // console.log(findLanguage);

      // const { id, username, email, verified, createdAt, updatedAt } = users.dataValues;

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
          // studies: findStudy,
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
