const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { body, validationResult } = require('express-validator');

const validateBooking = [
  body('email').isEmail().normalizeEmail(),
  body('full_name').trim().isLength({ min: 3 }),
  body('ticket_count').isInt({ min: 1, max: 10 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.get('/:code', bookingController.getBookingByCode);
router.get('/email/:email', bookingController.getBookingsByEmail);
router.post('/', validateBooking, bookingController.createBooking);

module.exports = router;