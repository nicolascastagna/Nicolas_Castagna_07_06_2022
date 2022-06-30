const { Posts, Likes } = require("../models/Posts");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(405).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(405).json({
        error: new error("Post non trouvé !"),
      });
    }
    if (post.userId !== req.auth.userId) {
      return res.status(405).json({
        error: new error("Requête non autorisée !"),
      });
    }

    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(405).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
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
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res
    .json({ listOfPosts: listOfPosts, likedPosts: likedPosts })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(405).json({ error }));
};
