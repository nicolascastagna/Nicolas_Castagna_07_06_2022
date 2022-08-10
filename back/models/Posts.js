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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
      foreignKey: { allowNull: false },
      hooks: true,
    });
    Posts.belongsTo(models.Users, {
      foreignKey: { allowNull: false },
      onDelete: "cascade",
    });
  };
  return Posts;
};
