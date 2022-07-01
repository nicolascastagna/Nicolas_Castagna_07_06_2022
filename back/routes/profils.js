const express = require("express");
const router = express.Router();
const profilsCtrl = require("../controllers/profils");
const auth = require("../middleware/auth");

router.get("/:id", auth, profilsCtrl.getProfil);
router.get("/", auth, profilsCtrl.getAllProfils);
router.put("/:id", auth, profilsCtrl.modifyProfil);
router.delete("/:id", auth, profilsCtrl.deleteProfil);

module.exports = router;
