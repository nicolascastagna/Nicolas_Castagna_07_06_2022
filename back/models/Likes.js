module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("Likes", {});

  Likes.associate = (models) => {
    Likes.belongsTo(models.Posts, { onDelete: "cascade" });
    Likes.belongsTo(models.Users, { onDelete: "cascade" });
    // Likes.belongsTo(models.Posts, {
    //   foreignKey: "PostId",
    //   targetKey: "id",
    // });
  };

  return Likes;
};
