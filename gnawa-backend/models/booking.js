const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ticket_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    confirmation_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'bookings',
    timestamps: true,
    hooks: {
      beforeCreate: (booking) => {
        const code = 'GNW-' + uuidv4().substring(0, 5).toUpperCase();
        booking.confirmation_code = code;
      }
    }
  });

  return Booking;
};