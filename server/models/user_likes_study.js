"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_likes_study extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Study }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User_likes_study.init(
    {},
    {
      sequelize,
      tableName: "user_likes_study",
      modelName: "User_likes_study",
    }
  );
  return User_likes_study;
};
