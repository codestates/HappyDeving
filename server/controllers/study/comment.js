const { User, Study_comment } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      // const { id } = req.params;

      const comment = await Study_comment.findAll({ include: [{ model: User, as: "user" }] });

      console.log(comment);
      res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json();
    }
  },
  post: async (req, res) => {
    try {
      const { user_id, study_id, content } = req.body;

      const user = await Study_comment.create({ user_id, study_id, content, parentId: 0 });

      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  patch: (req, res) => {
    try {
      res.send("comment patch ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: (req, res) => {
    try {
      res.send("comment delete ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
