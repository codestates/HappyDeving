const router = require("express").Router();
const { study } = require("../controllers");

// /study 스터디 글 상세, 글쓰기, 수정, 삭제
router.get("/:id", study.study.get);
router.post("/:id", study.study.post);
router.patch("/", study.study.patch);
router.delete("/:id", study.study.delete);

// 찜 목록 추가, 삭제
router.post("/like", study.like.post);
router.delete("/like", study.like.delete);

module.exports = router;
