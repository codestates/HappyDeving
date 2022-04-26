"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Study_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Study, Language }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Study_language.init(
    {},
    {
      sequelize,
      tableName: "study_language",
      modelName: "Study_language",
    }
  );
  return Study_language;
};
