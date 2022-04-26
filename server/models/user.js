"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Study_comment, Study, User_likes_study }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `User must have a username` },
          notEmpty: { msg: `username must not be empty` },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `User must have a email` },
          notEmpty: { msg: `Email must not be empty` },
          isEmail: { msg: `Must be a valid email address` },
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `User must have a password` },
          notEmpty: { msg: `password must not be empty` },
        },
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blog: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );
  return User;
};
