const { Posts, Users } = require("../models");
const fs = require("fs");
const Likes = require("../models/Likes");

exports.createPost = (req, res, next) => {
  const postObject = req.body;

  try {
    if (req.file) {
      postFile = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      postFile = null;
    }
  } catch (err) {
    return res.status(201).json({ errors });
  }

  const newPost = new Posts({
    ...postObject,
    UserId: req.auth.userId,
    postFile: postFile,
  });
  newPost
    .save()
    .then((data) => res.status(201).json({ data }))
    .catch((error) => res.status(500).json({ error }));
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

      Posts.findOne({ where: { id: req.params.id } })
        .then((post) => {
          if (post.UserId == req.auth.userId || admin) {
            if (post.postFile) {
              const filename = post.postFile.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                Posts.destroy({ where: { id: req.params.id } })
                  .then(() =>
                    res
                      .status(200)
                      .json({ message: "Post supprimé son image !" })
                  )
                  .catch((error) => res.status(400).json({ error }));
              });
            } else {
              Posts.destroy(
                { where: { id: req.params.id } },
                { truncate: true }
              );
              res.status(200).json({ message: "Publication supprimée." });
            }
          } else {
            return res.status(401).json({
              error: new error("Requête non autorisée !"),
            });
          }
        })
        .catch((error) =>
          res.status(500).json({ message: "Erreur dans la supression du post" })
        );
    });
  });
};

exports.getOnePost = async (req, res, next) => {
  Posts.findOne({
    where: { id: req.params.id },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPosts = async (req, res, next) => {
  Posts.findAll({
    include: {
      model: Users,
      attributes: ["id", "firstName", "lastName", "userPicture"],
    },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
