/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Discussions', [
      {
        title: 'Walking Together',
      },
      {
        title: 'Pets Care & Health',
      },
      {
        title: 'Overstaying',
      },
      {
        title: 'Charity',
      },
      {
        title: 'Random talk',
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discussions', null, {});
  },
};
