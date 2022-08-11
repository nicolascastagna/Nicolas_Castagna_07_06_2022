module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("Likes", {});

  Likes.associate = (models) => {
    Likes.belongsTo(models.Posts, {
      hooks: true,
      onDelete: "cascade",
    });

    Likes.belongsTo(models.Users, {
      hooks: true,
      onDelete: "cascade",
    });
  };

  return Likes;
};
