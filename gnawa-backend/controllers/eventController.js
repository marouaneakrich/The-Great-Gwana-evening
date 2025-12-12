 const { EventInfo } = require('../models');

exports.getEventInfo = async (req, res, next) => {
  try {
    const event = await EventInfo.findOne({ where: { id: 1 } });
    if (!event) {
      return res.status(404).json({ error: 'Event information not found' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};