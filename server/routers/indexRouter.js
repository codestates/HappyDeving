const router = require("express").Router();
const { study } = require("../controllers");

router.get("/", (req, res) => res.send("Happy deving!"));

// 스터디 검색 결과
router.get("/search", study.search.get);

// 댓글 생성, 수정, 삭제
router.get("/study/:id/comments", study.comment.get);
router.post("/studies/comment", study.comment.post);
router.patch("/studies/comment", study.comment.patch);
router.delete("/studies/comment", study.comment.delete);

module.exports = router;
