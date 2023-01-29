/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Discussions', [
      {
        title: 'Random talk',
      },
      {
        title: 'Random talk 2',
      },
      {
        title: 'Random talk 3',
      },
      {
        title: 'Random talk 4',
      },
      {
        title: 'Random talk 5',
      },
      {
        title: 'Random talk 6',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discussions', null, {});
  },
};
