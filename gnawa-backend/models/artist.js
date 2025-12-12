module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    performance_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'artists',
    timestamps: true
  });

  return Artist;
};