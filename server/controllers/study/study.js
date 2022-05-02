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
        startDate,
        createdAt,
        updatedAt,
        language,
        user_id,
      } = study;

      const findUsername = await User.findOne({
        where: { id: user_id },
        attributes: ["username"],
      });

      const findLocation = await Location.findOne({
        where: { id: location_id },
        attributes: ["latitude", "longitude", "name"],
      });

      study_comment.forEach((el) => (el.dataValues.username = findUsername.username));

      res.status(200).json({
        data: {
          study: {
            id,
            username: findUsername.username,
            title,
            content,
            kakaoLink,
            closed,
            location: findLocation,
            language,
            startDate,
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
      const {
        username,
        content,
        kakaoLink,
        startDate,
        closed,
        location,
        title,
        language_id,
        loginMethod,
      } = req.body;

      const data = checkAccessToken(req);
      const { id } = req.params;

      if (!data) {
        return res.status(401).json("signin required");
      }
      // if (data.id !== Number(id)) {
      //   return res.status(401).json("wrong req params");
      // }

      if (
        !username ||
        !content ||
        !kakaoLink ||
        !startDate ||
        closed === undefined ||
        !location ||
        !title ||
        !language_id ||
        loginMethod === undefined
      ) {
        return res.status(401).json("body required");
      }

      const findDong = location[3].split("");
      const findGu = location[2].split("");

      if (
        !location[0] ||
        typeof location[0] !== "string" ||
        !location[1] ||
        typeof location[1] !== "string" ||
        !location[2] ||
        !location[3] ||
        findDong[findDong.length - 1] !== "동" ||
        findGu[findGu.length - 1] !== "구" ||
        !location[4]
      ) {
        return res.status(401).json("location array incorrent");
      }

      const findOrCreateLocation = await Location.findOrCreate({
        where: {
          latitude: location[0],
          longitude: location[1],
          guType: location[2],
          dongType: location[3],
          name: location[4],
        },
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

      for (let i = 0; i < language_id.length; i++) {
        await Study_language.create({
          study_id: post.id,
          language_id: language_id[i],
        });
      }

      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      const {
        study_id,
        username,
        content,
        kakaoLink,
        startDate,
        closed,
        location,
        title,
        language_id,
        loginMethod,
      } = req.body;

      const { id } = req.params;

      if (!data) {
        return res.status(401).json("signin required");
      }

      const studyInfo = await Study.findOne({
        where: { id },
        include: [
          { model: Location, as: "location" },
          { model: Language, as: "language" },
        ],
      });

      let studylangueId = [];
      for (let i = 0; i < studyInfo.language.length; i++) {
        studylangueId.push(studyInfo.language[i].Study_language.language_id);
      }

      await Study.update(
        {
          content: content ? content : studyInfo.content,
          title: title ? title : studyInfo.title,
          kakaoLink: kakaoLink ? kakaoLink : studyInfo.kakaoLink,
          startDate: startDate ? startDate : studyInfo.startDate,
          closed: closed ? true : false,
          updatedAt: new Date(),
        },
        { where: { id } }
      );

      const study_languageInfo = await Study_language.findAll({
        where: { study_id: id },
        attributes: ["id"],
      });

      const study_languageId = [];
      study_languageInfo.forEach((el) => study_languageId.push(el.id));

      if (language_id) {
        if (language_id.length === study_languageId) {
          for (let i = 0; i < language_id.length; i++) {
            await Study_language.update(
              {
                language_id: language_id[i],
              },
              { where: { id: study_languageId[i] } }
            );
          }
        } else {
          for (let i = 0; i < study_languageId.length; i++) {
            Study_language.destroy({
              where: { id: study_languageId[i] },
            });
          }

          for (let i = 0; i < language_id.length; i++) {
            Study_language.create({
              study_id: id,
              language_id: language_id[i],
            });
          }
        }
      }

      if (location) {
        await Location.update(
          {
            name: location[4],
            latitude: location[0],
            longitude: location[1],
            guType: location[2],
            dongType: location[3],
          },
          { where: { id: studyInfo.location_id } }
        );
      }

      const result = await Study.findOne({
        where: { id },
        include: [
          { model: Location, as: "location" },
          { model: Language, as: "language" },
          { model: User, as: "user" },
        ],
      });

      res.status(200).json({
        data: {
          studies: [
            {
              id: result.id,
              username: result.user.username,
              content: result.content,
              title: result.title,
              kakaoLink: result.kakaoLink,
              closed: result.closed,
              location: {
                latitude: result.location.latitude,
                longitude: result.location.longitude,
              },
              language: result.language,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
            },
          ],
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  // ! 완료
  delete: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
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
