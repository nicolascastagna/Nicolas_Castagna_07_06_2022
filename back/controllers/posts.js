const { Posts, Users } = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = req.body;

  const post = new Posts({
    ...postObject,
    UserId: req.auth.userId,
    postFile: `${req.protocol}://${req.get("host")}/images/${req.file}`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  let admin = false;
  Users.findOne({ where: { id: req.auth.userId } }).then((user) => {
    if (user.admin === true) {
      admin = true;
    }
  });
  Posts.findOne({ where: { id: req.params.id } }).then((post) => {
    if (post.UserId == req.auth.userId || admin) {
      const postObject = req.file
        ? {
            ...req.body,
            postFile: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Posts.findOne({ where: { id: req.params.id } }).then((post) => {
        if (!req.file || !filename) {
          Posts.update(
            { ...postObject, id: req.params.id },
            { where: { id: req.params.id } }
          )
            .then(() => res.status(200).json({ message: "Post modifié !" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          const filename = post.postFile.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Posts.update(
              { ...postObject, id: req.params.id },
              { where: { id: req.params.id } }
            )
              .then(() => res.status(200).json({ message: "Post modifié !" }))
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

exports.deletePost = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } }).then((post) => {
    if (!post) {
      return res.status(404).json({
        error: new error("Post non trouvé !"),
      });
    }
    let admin = false;
    Users.findOne({ where: { id: req.auth.userId } }).then((user) => {
      if (user.admin === true) {
        admin = true;
      }
    });
    Posts.findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (post.UserId == req.auth.userId || admin) {
          const filename = post.postFile.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Posts.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
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

exports.getOnePost = async (req, res, next) => {
  Posts.findOne({
    where: { id: req.params.id },
  })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPosts = async (req, res, next) => {
  Posts.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
