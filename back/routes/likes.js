const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likes");
const auth = require("../middleware/auth");

router.post("/:id", auth, likesCtrl.postLike);
router.get("/", likesCtrl.getAllLikes);

module.exports = router;
