require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers");
const PORT = process.env.PORT || 4000;
// const indexRouter = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models/index");

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Routing
app.use("/users", router.userRouter);
app.use("/study", router.studyRouter);
app.use("/mypage", router.mypageRouter);
app.use("/", router.indexRouter);

// Check DB connection && Server Running
app.listen(PORT, async () => {
  try {
    console.log(`Server up on http://localhost:${PORT}`);
    await sequelize.authenticate();
    console.log(`Database Connected!`);
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  }
});
