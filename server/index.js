const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json({ strict: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
      cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
    },
    app.use("/", (req, res) => {
      res.send("Congrats! You made https server now :)");
    })
  )
  .listen(port);
