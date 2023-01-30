/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Followers', [{
      user_id: 1,
      follower_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 2,
      follower_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      follower_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
