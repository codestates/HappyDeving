require("dotenv").config();
require("dotenv").config();
const axios = require("axios");

module.exports = {
  post: async (req, res) => {
    try {
      const code = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`
      );

      console.log(code);

      if (!code) {
        return res.status(400).json();
      }
      res.json("kakao ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
