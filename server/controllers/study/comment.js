const { User, Study_comment, Study, Language } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      let { id } = req.params;

      id = Number(id);

      const comment = await Study_comment.findAll({
        where: { study_id: id },
        include: [{ model: User, as: "user" }],
      });

      comment.forEach(
        (el) => (
          (el.dataValues.username = el.user.username),
          (el.dataValues.user = undefined),
          (el.dataValues.image = el.user.image)
        )
      );

      return res.status(200).json({ data: { comments: comment } });
    } catch (err) {
      console.log(err);
      return res.status(500).json();
    }
  },
  post: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { user_id, study_id, content, parentId } = req.body;

      if (data.id !== user_id) {
        return res.status(403).json("wrong user");
      }

      if (!user_id || !study_id || !content || !parentId === null) {
        return res.status(401).json("body required");
      }

      const comment = await Study_comment.create({ user_id, study_id, content, parentId });

      res.status(201).json(comment);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { study_commentId, content: _content } = req.body;

      if (!study_commentId || !_content) {
        return res.status(401).json("body required");
      }

      if (_content) {
        await Study_comment.update(
          {
            content: _content,
          },
          { where: { id: study_commentId } }
        );
      }

      const comment = await Study_comment.findOne({
        where: { id: study_commentId },
      });

      if (!comment) {
        return res.status(404).json("comment not found");
      }

      const { id, user_id, study_id, content, parentId, createdAt, updatedAt } = comment.dataValues;

      const userInfo = await User.findOne({
        where: { id: user_id },
      });

      const { username, image } = userInfo.dataValues;

      return res.status(200).json({
        data: {
          comments: [
            { id, content, user_id, study_id, username, parentId, createdAt, updatedAt, image },
          ],
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: async (req, res) => {
    try {
      const { study_commentId } = req.body;

      if (!study_commentId) {
        return res.status(404).json("req body not found");
      }

      let comment = await Study_comment.findOne({
        where: { id: study_commentId },
      });

      const { content } = comment.dataValues;
      Study_comment.destroy({
        where: { content: content },
      });

      res.status(200).json("comment deleted");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
