const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, commentsCtrl.createComment);
router.delete("/:id", auth, multer, commentsCtrl.deleteComment);
router.put("/:id", auth, multer, commentsCtrl.modifyComment);
router.get("/", auth, commentsCtrl.getAllComments);
router.get("/:id", auth, commentsCtrl.getOneComment);

module.exports = router;
