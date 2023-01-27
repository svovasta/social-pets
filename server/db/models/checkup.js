const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Checkup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Checkup.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Checkup',
  });
  return Checkup;
};
