const router = require("express").Router();
const { study } = require("../controllers");

// 찜 목록 추가, 삭제
router.get("/like/:id", study.like.get);
router.post("/like", study.like.post);
router.delete("/like", study.like.delete);

// /study 스터디 글 상세, 글쓰기, 수정, 삭제
router.get("/:id", study.study.get);
router.post("/:id", study.study.post);
router.patch("/:id", study.study.patch);
router.delete("/:id", study.study.delete);

module.exports = router;
