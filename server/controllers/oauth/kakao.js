require("dotenv").config();
require("dotenv").config();
const axios = require("axios");

module.exports = {
  post: async (req, res) => {
    try {
      // const code = await axios.get(
      //   `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`
      // );

      // console.log(code);

      let myCode =
        "SVEsP_6qQEito7KAYARE7VbhrRXGMQldfJ_Get7lY1iKSpkidPD36GVMl8M0YTEGz7whAwopb7kAAAGAiOYYWQ";

      const kakaoClientId = process.env.KAKAO_REDIRECT_URI;
      const redirectURI = process.env.KAKAO_REDIRECT_URI;
      const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
      const code = myCode;

      const resp = await axios({
        method: "POST",
        url: `https://kauth.kakao.com/oauth/token}`,
        headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: kakaoClientId,
          client_secret: kakaoClientSecret,
          redirect_uri: redirectURI,
          code: code,
        }),
      });
      console.log(resp.access_token);

      if (!code) {
        return res.status(400).json();
      }
      res.send(resp);
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
