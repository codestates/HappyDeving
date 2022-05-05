const { User, Study_comment, Study, Language, Location } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    try {
      const data = checkAccessToken(req);

      if (!data) {
        return res.status(401).json("signin required");
      }
      const { id: paramsId } = req.params;

      if (data.id !== Number(paramsId)) {
        return res.status(401).json("wrong req params");
      }

      console.log(req);
      const { image } = req.body;

      console.log("image=======", image);

      const userInfo = await User.findOne({ where: { id: paramsId } });

      await User.update(
        {
          image: image ? image : userInfo.image,
        },
        { where: { id: paramsId } }
      );

      const result = await User.findOne({ where: { id: paramsId } });

      res.status(200).json({
        data: {
          userInfo: {
            id: data.id,
            image: result.image,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          },
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
