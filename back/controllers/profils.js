const { Users } = require("../models");
const fs = require("fs");
require("dotenv").config();

exports.getProfil = (req, res, next) => {
  Users.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllProfils = (req, res, next) => {
  Users.findAll({ attributes: { exclude: ["email", "password", "admin"] } })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyProfil = (req, res, next) => {
  const userProfil = req.file
    ? {
        ...req.body,
        userPicture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // Compare l'userId de l'utilisateur avec celui authentifier
  Users.findOne({ where: { id: req.params.id } }).then((user) => {
    if (req.params.id !== req.auth.userId) {
      return res.status(401).json({
        error: "Requête non autorisée !",
      });
    }
    if (!req.file) {
      Users.update(
        { ...userProfil, id: req.params.id },
        { where: { id: req.params.id } }
      )
        .then(() => res.status(200).json({ message: "Profil modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    }
    // Supprime et remplace par la nouvelle image
    else {
      const filename = user.userPicture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Users.update(
          { where: { id: req.params.id } },
          { ...userProfil, id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Profil modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    }
  });
};

// inclure userId différent de celui authentifier ne peut pas supprimer, voir avec id.params

exports.deleteProfil = (req, res, next) => {
  Users.findOne({ where: { id: req.params.id } }).then((user) => {
    if (!user) {
      return res.status(404).json({
        error: new error("Utilisateur non trouvé !"),
      });
    }
    // Compare userId avec le propriétaire du profil pour supprimer
    if (user.id !== req.auth.userId) {
      return res.status(401).json({
        error: new error("Requête non autorisée !"),
      });
    }
    // Suppression de l'image dans le dossier images
    // const filename = user.imageUrl.split("/images/")[1];
    // fs.unlink(`images/${filename}`, () => {
    Users.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Utlisateur supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
// .catch((error) => res.status(500).json({ error }));
// };
