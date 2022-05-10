const {
  User,
  Study_comment,
  Study,
  Language,
  Study_language,
  Location,
  User_likes_study,
} = require("../models");

module.exports = {
  withdrawal: async (id) => {
    const studyList = await Study.findAll({
      where: { user_id: id },
    });

    const study_commentList = await Study_comment.findAll({
      where: { user_id: id },
    });

    const User_likes_studyList = await User_likes_study.findAll({
      where: { user_id: id },
    });

    const studyIdList = [];
    await studyList.map((el) => studyIdList.push(el.id));

    const study_commentIdList = [];
    await study_commentList.forEach((el) => study_commentIdList.push(el.id));

    const User_likes_studyIdList = [];
    await User_likes_studyList.map((el) => User_likes_studyIdList.push(el.id));

    await Study_comment.destroy({
      where: { user_id: id },
    });

    for (let i = 0; i < User_likes_studyIdList.length; i++) {
      await User_likes_study.destroy({
        where: { user_id: User_likes_studyIdList[i] },
      });
    }

    for (let i = 0; i < studyIdList.length; i++) {
      await Study_language.destroy({
        where: { study_id: studyIdList[i] },
      });
      await Study_comment.destroy({
        where: { study_id: studyIdList[i] },
      });
      await User_likes_study.destroy({
        where: { study_id: studyIdList[i] },
      });
      await Study.destroy({
        where: { id: studyIdList[i] },
      });
    }

    await User.destroy({
      where: { id: id },
      include: [{ model: Study_comment, as: "study_comment" }],
    });
  },
};
