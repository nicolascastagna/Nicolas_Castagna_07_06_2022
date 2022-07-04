const { Posts, Likes } = require("../models");

exports.getLike = (req, res, next) => {
  try {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = Likes.findOne({
      where: { postId: PostId, userId: UserId },
    });

    if (!found) {
      Likes.create({ postId: PostId, userId: UserId });
      res.json({ liked: true });
    } else {
      Likes.destroy({
        where: { postId: PostId, userId: UserId },
      });
      res.json({ liked: false });
    }
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
