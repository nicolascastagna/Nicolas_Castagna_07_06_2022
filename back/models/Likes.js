module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    likeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Likes;
};
