const { User, Study, Study_comment, Language, Study_language, Location } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");
const { Op } = require("sequelize");

module.exports = {
  // ! 완료
  get: async (req, res) => {
    try {
      const study = await Study.findOne({
        where: { id: req.params.id },
        include: [
          { model: Language, as: "language", attributes: ["id", "name"] },
          {
            model: Study_comment,
            as: "study_comment",
            attributes: ["id", "content", "createdAt", "updatedAt", "parentId"],
          },
        ],
      });

      // study 없으면
      if (!study) {
        return res.status(404).json("not found");
      }

      const {
        id,
        content,
        title,
        kakaoLink,
        closed,
        study_comment,
        location_id,
        createdAt,
        updatedAt,
        language,
        user_id,
      } = study;

      console.log(study);

      const findUsername = await User.findOne({
        where: { id: user_id },
        attributes: ["username"],
      });

      const findLocation = await Location.findOne({
        where: { id: location_id },
        attributes: ["latitude", "longitude"],
      });

      study_comment.forEach((el) => (el.dataValues.username = findUsername.username));

      res.status(200).json({
        data: {
          study: {
            id,
            username: findUsername.username,
            content: { title, description: content },
            kakaoLink,
            closed,
            location: findLocation,
            language,
            createdAt,
            updatedAt,
          },
          comment: study_comment,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  // ! 완료
  post: async (req, res) => {
    try {
      const { content, kakaoLink, startDate, closed, location, title, language_id, loginMethod } =
        req.body;

      const data = checkAccessToken(req);
      const { id } = req.params;

      if (!data) {
        return res.status(401).json("signin required");
      }
      if (data.id !== Number(id)) {
        return res.status(401).json("wrong req params");
      }

      const findOrCreateLocation = await Location.findOrCreate({
        where: { latitude: location[0], longitude: location[1] },
      });

      // TODO: 경도 위도 필요시
      // const latitudeAndLongitude = [];
      // findOrCreateLocation.map((el) => {
      //   if (el.latitude && el.longitude) {
      //     latitudeAndLongitude.push(el.latitude, el.longitude);
      //   }
      // });

      const post = await Study.create({
        user_id: id,
        content,
        title,
        kakaoLink,
        startDate,
        location_id: findOrCreateLocation[0].id,
        closed,
        location,
      });

      console.log(language_id);
      for (let i = 0; i < language_id.length; i++) {
        await Study_language.create({
          study_id: post.id,
          language_id: language_id[i],
        });
      }

      res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: (req, res) => {
    try {
      res.send("study patch ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  // ! 완료
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Study_comment.destroy({
        where: { study_id: id },
      });

      await Study_language.destroy({
        where: { study_id: id },
      });

      const study = await Study.destroy({ where: { id } });

      res.status(200).json(study);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
