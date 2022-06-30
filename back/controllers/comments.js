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

exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;

  Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("Commentaire supprimé avec succès !");
};
