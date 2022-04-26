const router = require("express").Router();
const { mypage } = require("../controllers");

// /mypage 마이페이지 정보 수정, 탈퇴
router.get("/:id", mypage.mypage.get);
router.patch("/", mypage.mypage.patch);
router.delete("/", mypage.mypage.delete);

module.exports = router;
