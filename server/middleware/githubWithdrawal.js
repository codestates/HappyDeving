require("dotenv").config();
const axios = require("axios");
const fetch = require("node-fetch");
const { Octokit } = require("@octokit/core");
const {
  User,
  Study_comment,
  Study,
  Language,
  Study_language,
  Location,
  User_likes_study,
} = require("../models");

module.exports = {
  githubWithdrawal: async (accessToken) => {
    const githubClientId = process.env.GIT_CLIENT_ID;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const resp = await octokit.request(
      `DELETE /applications/${githubClientId}/token`,
      {
        client_id: githubClientId,
        access_token: accessToken,
      }
    );

    console.log(resp);
  },
};
