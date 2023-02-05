const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Post, { foreignKey: 'postId' });
    }
  }
  Favorites.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};
