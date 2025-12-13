module.exports = {
  up: async (queryInterface, Sequelize) => {
    const artists = [
      {
        name: 'Mahmoud Guinea',
        bio: 'Renowned gimbri master with 30 years of experience in traditional Gnawa music.',
        photo_url: 'https://images.unsplash.com/photo-1581978812658-eff4f75fe230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        performance_time: new Date('2024-12-20T19:00:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Aicha Majdoubi',
        bio: 'Powerful vocalist known for her soul-stirring interpretations of traditional chants.',
        photo_url: 'https://images.unsplash.com/photo-1742159946834-0bf113c78b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        performance_time: new Date('2024-12-20T20:30:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hassan Boussou',
        bio: 'Master of krakebs, creating the hypnotic rhythms that define Gnawa music.',
        photo_url: 'https://images.unsplash.com/photo-1593659238861-ee6e27fb9855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        performance_time: new Date('2024-12-20T22:00:00'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('artists', artists);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('artists', null, {});
  }
};