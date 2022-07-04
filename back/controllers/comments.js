const { Comments } = require("../models");

exports.createComment = (req, res, next) => {
  const comment = req.body;
  const User = req.user.userId;
  comment.User = User;
  Comments.create(comment);
  res.json(comment);
};

exports.getAllComments = (req, res, next) => {
  const postId = req.params.postId;
  const comments = Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
};

exports.modifyComment = (req, res, next) => {
  const userComment = req.file
    ? {
        ...JSON.parse(req.body.comment),
        commentsFile: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Comments.findOne({ where: { id: req.params.id } }).then((comment) => {
    if (!req.file) {
      Comments.updateOne(
        { where: { id: req.params.id } },
        { ...userComment, id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      const filename = comment.commentsFile.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Comments.updateOne(
          { where: { id: req.params.id } },
          { ...userComment, id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifié !" }))
          .catch((error) => res.status(400).json({ error }));
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
    // Compare userId avec le propriétaire du commentaire pour supprimer
    if (comment.id !== req.auth.commentId) {
      return res.status(401).json({
        error: new error("Requête non autorisée !"),
      });
    }
    Comments.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
