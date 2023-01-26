const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
