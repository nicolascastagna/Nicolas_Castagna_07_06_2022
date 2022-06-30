const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");

router.post("/", auth, postsCtrl.createPost);
router.put("/:id", auth, postsCtrl.modifyPost);
router.delete("/:id", auth, postsCtrl.deletePost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.get("/", auth, postsCtrl.getAllPosts);

module.exports = router;
