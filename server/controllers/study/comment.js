const { User, Study_comment } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      // const { id } = req.params;
      // const data = checkAccessToken(req);
      // if (!data) {
      //   return res.status(401).json("signin required");
      // }

      const comment = await Study_comment.findAll({ include: [{ model: User, as: "user" }] });

      res.json(comment);
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
      const { id: _id, content: _content } = req.body;

      if (!_id || !_content) {
        return res.status(401).json("body required");
      }

      if (_content) {
        await Study_comment.update(
          {
            content: _content,
          },
          { where: { id: _id } }
        );
      }

      const comment = await Study_comment.findOne({
        where: { id: _id },
      });

      const { id, user_id, content, parentId, createdAt, updatedAt } = comment;

      const userInfo = await User.findOne({
        where: { id: user_id },
      });

      const { username } = userInfo;

      return res.status(200).json({
        data: {
          comments: [{ id, content, username, parentId, createdAt, updatedAt }],
          userInfo: { id, username },
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.body;

      let comment = await Study_comment.findOne({
        where: { id: id },
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
