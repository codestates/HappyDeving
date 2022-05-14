const router = require("express").Router();
const { users, oauth } = require("../controllers");

// /users
router.post("/signin", users.signin.post);
router.post("/signup", users.signup.post);
router.get("/:id/verify/:token", users.signup.get);
router.post("/signout", users.signout.post);
router.delete("/withdrawal/:id", users.withdrawal.delete);
router.post("/login/github", oauth.github.post);
router.post("/login/google", oauth.google.post);
router.get("/login/kakao", oauth.kakao.get);
router.post("/login/kakao", oauth.kakao.post);
router.post("/login/naver", oauth.naver.post);

module.exports = router;
