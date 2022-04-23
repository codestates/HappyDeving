const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
// const indexRouter = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { User } = require("./models/index");
dotenv.config();

app.use(express.json({ strict: false }));
app.use(cookieParser());
app.use(cors());
// app.use("/", indexRouter);

app.get("/", async (err, res, req) => {
  const findInfo = await User.findOne({
    where: { id: 1 },
  });
  const { dataValues } = findInfo;
  console.log(dataValues);
  res.status(200).json(dataValues);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
