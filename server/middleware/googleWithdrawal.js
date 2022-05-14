const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  googleWithdrawal: async (accessToken) => {
    // const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const googleaccessToken = process.env.GOOGLE_ACCESS_TOKEN;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClinentSecret = process.env.GOOGLE_CLIENT_SECRET;
    const googleinfo = await axios({
      url: `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
      port: "443",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const postReq = await https.request(postOptions, function (res) {
      res.setEncoding("utf8");
      res.on("data", (d) => {
        console.log("Response: " + d);
      });
    });

    postReq.on("error", (error) => {
      console.log(error);
    });

    // Post the request with data
    postReq.write(postData);
    postReq.end();
  },
};
