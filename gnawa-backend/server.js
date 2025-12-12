const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/event', require('./routes/event'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'The Great Gnawa Evening API',
    endpoints: {
      event: 'GET /api/event',
      artists: 'GET /api/artists | GET /api/artists/:id',
      bookings: 'POST /api/bookings | GET /api/bookings/:code | GET /api/bookings/email/:email',
      admin: 'POST /api/auth/login (Protected: POST artists, PUT/DELETE artists/:id)'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;