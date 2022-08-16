module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      hooks: true,
      onDelete: "cascade",
    });
    Posts.belongsTo(models.Users, {
      onDelete: "cascade",
    });
  };
  return Posts;
};
