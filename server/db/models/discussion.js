const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message }) {
      this.hasMany(Message, { foreignKey: 'discussionId' });
    }
  }
  Discussion.init({
    title: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Discussion',
  });
  return Discussion;
};
