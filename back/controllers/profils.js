const { Users } = require("../models");
const fs = require("fs");
require("dotenv").config();

exports.getProfil = (req, res, next) => {
  const Users = req.params.id;

  const post = Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(post);
};

exports.getAllProfils = (req, res, next) => {
  Users.findAll({ attributes: { exclude: ["id", "email", "password"] } })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyProfil = (req, res, next) => {
  const userProfil = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Users.findOne({ _id: req.params.id }).then((user) => {
    if (!req.file) {
      Users.updateOne(
        { _id: req.params.id },
        { ...userProfil, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Profil modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      const filename = user.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Users.updateOne(
          { _id: req.params.id },
          { ...userProfil, _id: req.params.id }
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
    // Compare userId avec le propriétaire de la sauce pour supprimer
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
