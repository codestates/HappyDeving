const { checkAccessToken } = require("../tokenFunctions");
const { User, Study_comment, Study, Language, Location } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }

      const { id: paramsId } = req.params;

      if (data.id !== Number(paramsId)) {
        return res.status(401).json("wrong req params");
      }

      const studies = await Study.findAll({
        where: { user_id: paramsId },
        attributes: ["id", "content", "title", "startDate", "createdAt", "updatedAt"],
        include: { model: Language, as: "language", attributes: ["id", "name"] },
      });

      res.json({ data: { studies } });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
