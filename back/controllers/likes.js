const { Likes, Users, Posts } = require("../models");

exports.postLike = (req, res, next) => {
  try {
    const PostId = req.params.id;
    const UserId = req.auth.userId;

    Posts.findOne({
      where: { id: req.params.id },
    }).then((post) => {
      Likes.findOne({
        where: { PostId: PostId, UserId: UserId },
      }).then((like) => {
        if (!like) {
          Likes.create({ PostId: PostId, UserId: UserId })
            .then((like) => {
              res.status(201).json({ message: "Vous avez aimé le post !" });
            })
            .catch((error) => res.status(400).json({ error: error.message }));
        } else if (like) {
          Likes.destroy({
            where: { PostId: PostId, UserId: UserId },
          })
            .then((like) => {
              res.status(201).json({ message: "Vous n'aimez plus le post !" });
            })
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      });
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
