const { checkAccessToken } = require("../tokenFunctions");
const { User_likes_study, Study, Language } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const data = checkAccessToken(req);

    if (!data) {
      return res.status(401).json("signin required");
    }
    const { id: paramsId } = req.params;

    const userLike = await User_likes_study.findAll({
      where: { user_id: paramsId },
      include: [
        {
          model: Study,
          as: "study",
          attributes: ["id", "content", "title", "startDate", "createdAt", "updatedAt"],
          include: { model: Language, as: "language", attributes: ["id", "name"] },
        },
      ],
    });

    const studyList = [];
    userLike.forEach((el) => studyList.push(el.study));

    return res.status(200).json({ data: { studies: [...studyList] } });
  },
  post: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }

      const { user_id, study_id } = req.body;

      if (!user_id || !study_id) {
        return res.status(401).json("body required");
      }

      const check = await User_likes_study.findOne({
        where: { study_id },
      });

      if (!check) {
        const like = await User_likes_study.create({ user_id, study_id });
        return res.status(201).json(like);
      }

      return res.status(401).json("already liked");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }

      const { id, study_id } = req.body;

      let like = await User_likes_study.findOne({
        where: { study_id: study_id, user_id: id },
      });

      await like.destroy();

      // await User_likes_study.destory({
      //   where: { study_id: study_id, user_id: id },
      // });

      res.status(200).json(`like deleted`);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
