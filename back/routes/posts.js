const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postsCtrl.createPost);
router.put("/:id", auth, multer, postsCtrl.modifyPost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.get("/", auth, postsCtrl.getAllPosts);

module.exports = router;
