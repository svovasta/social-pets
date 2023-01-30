const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Message, Favorites, Like, Post, Comment, Checkup,
    }) {
      this.hasMany(Message, { foreignKey: 'userId' });
      this.hasMany(Favorites, { foreignKey: 'userId' });
      this.hasMany(Like, { foreignKey: 'userId' });
      this.hasMany(Post, { foreignKey: 'userId' });
      this.hasMany(Comment, { foreignKey: 'userId' });
      this.hasMany(Checkup, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
