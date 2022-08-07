const { Likes, Users, Posts } = require("../models");

exports.postLike = (req, res, next) => {
  try {
    const PostId = req.params.id;
    const UserId = req.auth.userId;

    Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    }).then((like) => {
      if (!like) {
        Likes.create({ PostId: PostId, UserId: UserId });
        res.json({ liked: true, PostId, UserId });
      } else {
        Likes.destroy({
          where: { PostId: PostId, UserId: UserId },
        });
        res.json({ liked: false, PostId, UserId });
      }
    });
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.getAllLikes = async (req, res, next) => {
  try {
    Likes.findAll({
      include: [
        {
          model: Posts,
          attributes: ["id"],
          include: [
            {
              model: Users,
              attributes: ["id"],
            },
          ],
        },
      ],
    }).then((likes) => {
      res.status(200).json({
        Likes: likes,
      });
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
