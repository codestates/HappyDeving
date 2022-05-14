const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  googleWithdrawal: async (accessToken) => {
    // Build the string for the POST request
    // let postData = "token=" + userCredential.access_token;
    let postData = "token=" + accessToken;

    let postOptions = {
      host: "oauth2.googleapis.com",
      port: "443",
      path: "/revoke",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

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
