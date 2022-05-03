const router = require("express").Router();
const { study } = require("../controllers");

// /study 스터디 글 상세, 글쓰기, 수정, 삭제
router.get("/:id", study.study.get);
router.post("/:id", study.study.post);
router.patch("/:id", study.study.patch);
router.delete("/:id", study.study.delete);

module.exports = router;
