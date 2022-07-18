const { Comments, Users, Posts } = require("../models");
const fs = require("fs");

exports.createComment = (req, res, next) => {
  const commentsObject = req.body;

  const comments = new Comments({
    ...commentsObject,
    userId: req.auth.userId,
    postId: req.params.id,
    commentsFile: `${req.protocol}://${req.get("host")}/images/${req.file}`,
  });
  comments
    .save()
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Comments.findAll({ includes: [Users, Posts] })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneComment = async (req, res, next) => {
  const id = req.params.id;
  const comment = await Comments.findByPk(id);
  res
    .json(comment)
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(401).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  let admin = false;
  Users.findOne({ where: { id: req.auth.userId } }).then((user) => {
    if (user.admin === true) {
      admin = true;
    }
  });
  Comments.findOne({ where: { id: req.params.id } }).then((comment) => {
    if (comment.userId == req.auth.userId || admin) {
      const commentsObject = req.file
        ? {
            ...req.body,
            commentsFile: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Comments.findOne({ where: { id: req.params.id } }).then((comment) => {
        if (!req.file || !filename) {
          Comments.update(
            { ...commentsObject, id: req.params.id },
            { where: { id: req.params.id } }
          )
            .then(() =>
              res.status(200).json({ message: "Commentaire modifié !" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          const filename = comment.commentsFile.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Comments.update(
              { ...commentsObject, id: req.params.id },
              { where: { id: req.params.id } }
            )
              .then(() =>
                res.status(200).json({ message: "Commentaire modifié !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        }
      });
    } else {
      return res.status(401).json({
        error: new error("Requête non autorisée !"),
      });
    }
  });
};

exports.deleteComment = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } }).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: new error("Commentaire non trouvé !"),
      });
    }
    let admin = false;
    Users.findOne({ where: { id: req.auth.userId } }).then((user) => {
      if (user.admin === true) {
        admin = true;
      }
    });
    Comments.findOne({ where: { id: req.params.id } })
      .then((comment) => {
        if (comment.userId == req.auth.userId || admin) {
          const filename = comment.commentsFile.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Comments.destroy({ where: { id: req.params.id } })
              .then(() =>
                res.status(200).json({ message: "Commentaire supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          return res.status(401).json({
            error: new error("Requête non autorisée !"),
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
};
