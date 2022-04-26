require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });
  },
  generaterefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, {
      expiresIn: "3d",
    });
  },
  sendTocookie: (res, accessToken, refreshToken) => {
    const cookieOption = {
      // secure: true,
      // maxAge:
      httpOnly: true,
      // sameSite: 'none'
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);
  },
  // checkRefreshToken: (refreshToken) => {},
  checkAccessToken: (req) => {
    const { authorization } = req.headers;
    try {
      const accessToken = authorization.split(" ")[1];

      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkRefreshToken: (req, res) => {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);

    if (!refreshToken) {
      res.status(400).json("refreshToken not provided");
    } else {
      const data = verify(refreshToken, process.env.REFRESH_SECRET);
      console.log(data);
      return data;
    }
  },
};
