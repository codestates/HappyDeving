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
      this.hasMany(Study_language, { foreignKey: "language_id", as: "study_language" });
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
    }
  );
  return Language;
};
