const express = require("express");
const router = express.Router();
const profilsCtrl = require("../controllers/profils");

router.put("/:id", profilsCtrl.modifyProfil);
router.delete("/:id", profilsCtrl.deleteProfil);
router.get("/:id", profilsCtrl.getOneProfil);
router.get("/", profilsCtrl.getAllProfils);

module.exports = router;
