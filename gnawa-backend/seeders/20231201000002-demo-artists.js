module.exports = {
  up: async (queryInterface, Sequelize) => {
    const artists = [
      {
        name: 'Maalem Hassan Hakmoun',
        bio: 'Master of the Gnawa tradition, renowned for his hypnotic Gimbri rhythms and powerful vocals.',
        photo_url: 'https://images.unsplash.com/photo-1581978812658-eff4f75fe230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        performance_time: new Date('2024-12-20T19:00:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Aissaoua Gnawa Ensemble',
        bio: 'A collective preserving ancestral Gnawa rituals with authentic Krakebs and ceremonial dances.',
        photo_url: 'https://example.com/artists/aissaoua.jpg',
        performance_time: new Date('2024-12-20T20:30:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Zaina Gnawa Fusion',
        bio: 'Modern Gnawa fusion blending traditional sounds with contemporary jazz influences.',
        photo_url: 'https://example.com/artists/zaina-fusion.jpg',
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