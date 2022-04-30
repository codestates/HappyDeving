"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Study_language }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Language.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `langaugeName not allowed null` },
          notEmpty: { msg: `languageName must not be empty` },
        },
      },
    },
    {
      sequelize,
      tableName: "language",
      modelName: "Language",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Language;
};
