const router = require("express").Router();
const { mypage } = require("../controllers");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// /mypage 내가 찜한 스터디 조회, 수정, 삭제
router.get("/:id/like", mypage.like.get);
router.post("/:id/like", mypage.like.post);
router.delete("/:id/like", mypage.like.delete);

// 내가 쓴 스터디 목록
router.get("/:id/write", mypage.mystudy.get);

// mypage 마이페이지 이미지 수정
router.post("/image/:id", upload.single("image"), mypage.image.post);

// /mypage 마이페이지 정보 조회, 수정
router.get("/:id", mypage.mypage.get);
router.patch("/:id", mypage.mypage.patch);

module.exports = router;
