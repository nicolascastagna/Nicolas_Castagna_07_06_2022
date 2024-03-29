module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("Likes", {});

  Likes.associate = (models) => {
    Likes.belongsTo(models.Posts, {
      onDelete: "cascade",
      foreignKey: {
        name: "PostId",
        allowNull: false,
      },
      hooks: true,
    });

    Likes.belongsTo(models.Users, {
      onDelete: "cascade",
      hooks: true,
    });
  };

  return Likes;
};
