const { Likes, Users } = require("../models");

exports.postLike = (req, res, next) => {
  try {
    const PostId = req.params.id;
    const UserId = req.auth.userId;

    Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    }).then((like) => {
      if (!like) {
        Likes.create({ PostId: PostId, UserId: UserId });
        res.json({ liked: true });
      } else {
        Likes.destroy({
          where: { PostId: PostId, UserId: UserId },
        });
        res.json({ liked: false });
      }
    });
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.getAllLikes = async (req, res, next) => {
  Likes.findAll({
    includes: { model: Users, attributes: ["id"] },
  })
    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(400).json({ error }));
};
