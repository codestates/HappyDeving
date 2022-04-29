const router = require("express").Router();
const { users } = require("../controllers");

// /users
router.post("/signin", users.signin.post);
router.post("/signup", users.signup.post);
router.post("/signout", users.signout.post);
router.delete("/withdrawal/:id", users.withdrawal.delete);
router.post("/login/github", users.github.post);
router.post("/login/google", users.google.post);

module.exports = router;
