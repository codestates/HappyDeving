"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Study_comment extends Model {
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
  Study_comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: `study_comment not allowed null` },
          notEmpty: { msg: `study_comment must not be empty` },
        },
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "study_comment",
      modelName: "Study_comment",
    }
  );
  return Study_comment;
};
