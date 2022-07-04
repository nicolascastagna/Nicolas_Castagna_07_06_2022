const { Posts, Likes } = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = req.body;

  const post = new Posts({
    ...postObject,
    postFile: `${req.protocol}://${req.get("host")}/images/${req.file}`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  if (req.params.id || req.auth.admin) {
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
        Posts.update({ ...postObject }, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        const filename = post.postFile.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Posts.update({ ...postObject }, { where: { id: req.params.id } })
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
};

exports.deletePost = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new error("Post non trouvé !"),
        });
      }
      if (post.id !== req.auth.postId) {
        return res.status(401).json({
          error: new error("Requête non autorisée !"),
        });
      }
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Posts.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(405).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = async (req, res, next) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res
    .json(post)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(405).json({ error }));
};

exports.getAllPosts = async (req, res, next) => {
  Posts.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
