const { User, Study, Study_comment, Language, Study_language } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.params;

      const study = await Study.findOne({
        where: { id },
        include: ["study_comment"],
      });

      const {
        id: userId,
        content,
        title,
        kakaoLink,
        closed,
        study_comment,
        location_id,
        createdAt,
        updatedAt,
      } = study;

      const findUsername = await User.findOne({
        where: { id: userId },
        attributes: ["username"],
      });

      const { username } = findUsername;
      const language_id = await Study_language.findAll({
        where: { study_id: id },
      });

      const index = [];
      language_id.forEach((el) => index.push(el.language_id));

      const languages = await Language.findAll({
        where: { id: { [Op.in]: index } },
      });

      const language = [];
      languages.forEach((el) => language.push(el.dataValues));

      study_comment.forEach((el) => (el.dataValues.username = username));

      res.send({
        data: {
          study: {
            id,
            username,
            content: { title, description: content },
            kakaoLink,
            closed,
            location_id,
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
  post: async (req, res) => {
    try {
      const { content, kakaoLink, startDate, closed, location, title, loginMethod } = req.body;

      const data = checkAccessToken(req);
      const { id } = req.params;

      if (!data) {
        return res.status(401).json("signin required");
      }
      if (data.id !== Number(id)) {
        return res.status(401).json("wrong req params");
      }

      console.log(loginMethod);

      const post = await Study.create({
        user_id: id,
        content,
        title,
        kakaoLink,
        startDate,
        closed,
        location,
      });

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
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const study = await Study.destroy({ where: { id } });

      res.status(200).json(study);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
