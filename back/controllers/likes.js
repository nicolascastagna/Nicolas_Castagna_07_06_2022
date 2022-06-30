exports.getLike = async (req, res, next) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  await Likes.create({ PostId: PostId, UserId: UserId });
  res.json("Success");
};
