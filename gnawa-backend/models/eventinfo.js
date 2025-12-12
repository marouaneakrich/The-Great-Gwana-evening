module.exports = (sequelize, DataTypes) => {
  const EventInfo = sequelize.define('EventInfo', {
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    banner_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    ticket_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'event_info',
    timestamps: false
  });

  return EventInfo;
};