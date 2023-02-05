const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Comment, Favorites, Like,
    }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Comment, { foreignKey: 'postId' });
      this.hasMany(Favorites, { foreignKey: 'postId' });
      this.hasMany(Like, { foreignKey: 'postId' });
    }
  }
  Post.init({
    image: DataTypes.TEXT,
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
