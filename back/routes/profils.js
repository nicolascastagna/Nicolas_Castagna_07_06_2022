const express = require("express");
const router = express.Router();
const profilsCtrl = require("../controllers/profils");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/:id", auth, profilsCtrl.getProfil);
router.get("/", auth, profilsCtrl.getAllProfils);
router.put("/:id", auth, multer, profilsCtrl.modifyProfil);
router.delete("/:id", auth, multer, profilsCtrl.deleteProfil);

module.exports = router;
