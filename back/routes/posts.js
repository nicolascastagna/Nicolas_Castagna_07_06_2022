const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");

router.post("/", postsCtrl.createPost);
router.put("/:id", postsCtrl.modifyPost);
router.delete("/:id", postsCtrl.deletePost);
router.get("/:id", postsCtrl.getOnePost);
router.get("/", postsCtrl.getAllPosts);

module.exports = router;
