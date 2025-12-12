module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_info', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      venue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      banner_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ticket_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      }
    }, {
      timestamps: false
    });
    
    await queryInterface.bulkInsert('event_info', [{
      event_name: 'The Great Gnawa Evening',
      description: 'A mesmerizing cultural celebration of Gnawa musical heritage in Agadir.',
      date: new Date('2024-12-20T19:00:00'),
      venue: 'Théâtre de Verdure, Agadir',
      banner_url: 'https://images.unsplash.com/photo-1736718126728-1411d72b37b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      ticket_price: 150.00
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('event_info');
  }
};