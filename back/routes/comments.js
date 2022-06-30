const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

router.post("/", auth, commentsCtrl.createComment);
router.delete("/:commentId", auth, commentsCtrl.deleteComment);
router.get("/:postId", auth, commentsCtrl.getAllComments);

module.exports = router;
