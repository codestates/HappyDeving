const router = require("express").Router();
const { mypage } = require("../controllers");

// /mypage 마이페이지 정보 조회, 수정
router.get("/:id", mypage.mypage.get);
router.patch("/:id", mypage.mypage.patch);

module.exports = router;
