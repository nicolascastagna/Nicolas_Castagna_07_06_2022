module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commentsText: {
      type: DataTypes.TEXT,
    },
    commentsFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
  });
  return Comments;
};
