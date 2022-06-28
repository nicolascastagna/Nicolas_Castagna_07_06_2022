const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likes");

router.post("/:id", likesCtrl.getLike);

module.exports = router;
