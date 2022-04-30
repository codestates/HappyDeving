"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Study extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, User_likes_study, Study_comment, Study_language, Location }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Study.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: `content not allowed null` },
          notEmpty: { msg: `content must not be empty` },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `title not allowed null` },
          notEmpty: { msg: `title must not be empty` },
        },
      },
      kakaoLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `kakaoLink not allowed null` },
          notEmpty: { msg: `kakaoLink must not be empty` },
        },
      },
      closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: `closed not allowed null` },
          notEmpty: { msg: `closed must not be empty` },
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: `startDate not allowed null` },
          notEmpty: { msg: `startDate must not be empty` },
        },
      },
    },
    {
      sequelize,
      tableName: "study",
      modelName: "Study",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Study;
};
