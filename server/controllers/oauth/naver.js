require("dotenv").config();
const { User } = require("../../models");
const axios = require("axios");
const fetch = require("node-fetch");
const { generateAccessToken, sendTocookie, generaterefreshToken } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    try {
      return res.status.json("naver get ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  post: async (req, res) => {
    try {
      return res.status(200).json("naver ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
