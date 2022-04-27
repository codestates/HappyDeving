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
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(Study, { foreignKey: "study_id", as: "study" });
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
