const { Posts, Likes } = require("../models");

exports.getLike = (req, res, next) => {
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
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { userId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch {
    (error) => res.status(500).json(error);
  }
};
