const { User, Study_comment, Study, Language, Location } = require("../../models");
const { checkAccessToken } = require("../tokenFunctions");

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

      const users = await User.findOne({
        where: {
          id: paramsId,
        },
        // attributes: ["id", "username", "email", "verified", "createdAt", "updatedAt"],
        include: [
          {
            model: Study,
            as: "study",
            attributes: [
              "id",
              "content",
              "location_id",
              "title",
              "kakaoLink",
              "closed",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: Language,
                as: "language",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: Study_comment,
            as: "study_comment",
            attributes: ["id", "content", "createdAt", "updatedAt", "parentId"],
          },
        ],
      });

      for (let i = 0; i < users.study.length; i++) {
        const { username } = users;
        let { location_id } = users.study[i];

        let location = await Location.findOne({
          attributes: ["latitude", "longitude"],
        });
        if (users.study[i]) {
          users.study[i].dataValues.location = location;
        }
        users.study[i].dataValues.username = username;
        if (users.study_comment[i]) {
          users.study_comment[i].dataValues.username = username;
        }
      }
      const {
        id,
        username,
        email,
        verified,
        github,
        blog,
        bio,
        image,
        loginMethod,
        createdAt,
        updatedAt,
        study,
        study_comment,
      } = users;

      return res.json({
        data: {
          userInfo: {
            id,
            username,
            email,
            verified,
            github,
            blog,
            bio,
            image,
            loginMethod,
            createdAt,
            updatedAt,
          },
          comments: study_comment,
        },
      });
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
      const { id: paramsId } = req.params;

      if (data.id !== Number(paramsId)) {
        return res.status(401).json("wrong req params");
      }

      const { username, github, blog, bio } = req.body;

      const userInfo = await User.findOne({ where: { id: paramsId } });

      await User.update(
        {
          username: username ? username : userInfo.username,
          github: github ? github : userInfo.github,
          blog: blog ? blog : userInfo.blog,
          bio: bio ? bio : userInfo.bio,
        },
        { where: { id: paramsId } }
      );

      const result = await User.findOne({ where: { id: paramsId } });

      res.status(200).json({ data: { userInfo: result } });
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
