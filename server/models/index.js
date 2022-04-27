"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations setting
const { User, Language, Location, Study_comment, Study_language, Study, User_likes_study } =
  sequelize.models;

User.hasMany(Study, { foreignKey: "user_id", as: "study" });
Study.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Study_comment, { foreignKey: "user_id", as: "study_comment" });
Study_comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(User_likes_study, { foreignKey: "user_id", as: "user_likes_study" });
User_likes_study.belongsTo(User, { foreignKey: "user_id", as: "user" });

Study.hasMany(User_likes_study, { foreignKey: "study_id", as: "user_likes_study" });
User_likes_study.belongsTo(Study, { foreignKey: "study_id", as: "study" });

Study.belongsToMany(Language, {
  through: "Study_language",
  foreignKey: "study_id",
  as: "language",
});

Language.belongsToMany(Study, {
  through: "Study_language",
  foreignKey: "language_id",
  as: "study",
});

Study_language.belongsTo(Study, { foreignKey: "study_id", as: "study" });
Study_language.belongsTo(Language, { foreignKey: "language_id", as: "language" });

Study.belongsTo(Location, { foreignKey: "location_id", as: "location" });
Location.hasMany(Study, { foreignKey: "location_id", as: "location" });

Study.hasMany(Study_comment, { foreignKey: "study_id", as: "study_comment", onDelete: "cascade" });
Study_comment.belongsTo(Study, { foreignKey: "study_id", as: "study", onDelete: "cascade" });

module.exports = db;
