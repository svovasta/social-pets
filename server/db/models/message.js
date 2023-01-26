const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Discussion }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Discussion, { foreignKey: 'discussionId' });
    }
  }
  Message.init({
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    discussionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
