const {
  User,
  Study_comment,
  Study,
  Language,
  Location,
} = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");
const { uploadFile, getFileStream } = require("../../middleware/s3");

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

      const file = req.file;
      const uploadImg = await uploadFile(file);

      const image = uploadImg.Location;

      // const image = await getFileStream(result.Key);
      // console.log("image=========", image);

      // return res.json({ image: result.Location });

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
