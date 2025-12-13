const { Booking } = require('../models');

exports.getBookingByCode = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ where: { confirmation_code: req.params.code } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

exports.getBookingsByEmail = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: { email: req.params.email },
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { email, full_name, phone, ticket_count } = req.body;
    
    if (ticket_count < 1 || ticket_count > 10) {
      return res.status(400).json({ error: 'Ticket count must be between 1 and 10' });
    }

    const booking = await Booking.create({
      email,
      full_name,
      phone,
      ticket_count
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};