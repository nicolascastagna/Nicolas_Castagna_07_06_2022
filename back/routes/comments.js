const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/", commentsCtrl.createComments);
router.put("/:id", commentsCtrl.modifyComments);
router.delete("/:id", commentsCtrl.deleteComments);
router.get("/:id", commentsCtrl.getOneComments);
router.get("/", commentsCtrl.getAllComments);

module.exports = router;
