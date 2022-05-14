const { Study, Language, Location } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      // const decoded = decodeURI(req.url);
      const { guType, dongType, language, startDate } = req.query;

      if (language && !startDate) {
        const locationList = await Study.findAll({
          include: [
            {
              model: Location,
              as: "location",
              where: { guType, dongType },
              attributes: ["latitude", "longitude", "guType", "dongType"],
            },
            {
              model: Language,
              as: "language",
              attributes: ["id", "name"],
              where: { name: language },
            },
          ],
          attributes: [
            "id",
            "content",
            "title",
            "kakaoLink",
            "closed",
            "startDate",
            "createdAt",
            "updatedAt",
          ],
        });
        // console.log(locationList);
        return res.status(200).json(locationList);
      } else if (startDate && !language) {
        const locationList = await Study.findAll({
          where: { startDate },
          include: [
            {
              model: Location,
              as: "location",
              where: { guType, dongType },
              attributes: ["latitude", "longitude", "guType", "dongType"],
            },
            { model: Language, as: "language", attributes: ["id", "name"] },
          ],
          attributes: [
            "id",
            "content",
            "title",
            "kakaoLink",
            "closed",
            "startDate",
            "createdAt",
            "updatedAt",
          ],
        });
        // console.log(locationList);
        return res.status(200).json(locationList);
      } else if (startDate && language) {
        const locationList = await Study.findAll({
          where: { startDate },
          include: [
            {
              model: Location,
              as: "location",
              where: { guType, dongType },
              attributes: ["latitude", "longitude", "guType", "dongType"],
            },
            {
              model: Language,
              as: "language",
              attributes: ["id", "name"],
              where: { name: language },
            },
          ],
          attributes: [
            "id",
            "content",
            "title",
            "kakaoLink",
            "closed",
            "startDate",
            "createdAt",
            "updatedAt",
          ],
        });
        return res.status(200).json(locationList);
      }
      const locationList = await Study.findAll({
        include: [
          {
            model: Location,
            as: "location",
            where: { guType, dongType },
            attributes: ["latitude", "longitude", "guType", "dongType"],
          },
          {
            model: Language,
            as: "language",
            attributes: ["id", "name"],
          },
        ],
        attributes: [
          "id",
          "content",
          "title",
          "kakaoLink",
          "closed",
          "startDate",
          "createdAt",
          "updatedAt",
        ],
      });
      // console.log(locationList);
      // if (!locationList.length) {
      //   return res.status(404).json("not found");
      // }
      return res.status(200).json(locationList);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
